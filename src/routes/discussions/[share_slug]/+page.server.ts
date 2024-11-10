import { db } from '@/server/db';
import type { PageServerLoad } from './$types';
import {
	comment,
	comment_vote,
	conversation,
	conversation_vote,
	type Conversation,
	type NewComment,
	type NewCommentVote,
	type NewConversationVote
} from '@/server/db/schema';
import { and, eq } from 'drizzle-orm';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { getUserFromCookies } from '@/server/utils';

export const load: PageServerLoad = async ({ params, parent }) => {
	const { user } = await parent();
	const share_slug = params.share_slug;
	const discussion = await db
		.select()
		.from(conversation)
		.where(eq(conversation.share_slug, share_slug))
		.then((rows) => rows.at(0));
	if (!discussion) {
		error(404, {
			message: 'Not found'
		});
	}
	const comments = await db
		.select()
		.from(comment)
		.where(eq(comment.conversation_id, discussion.id));
	const comments_with_author_votes = await Promise.all(
		comments.map(async (c) => {
			async function get_vote(discussion: Conversation) {
				if (!c.show_creator_vote) {
					return null;
				}
				if (c.parent_id) {
					const result = await db
						.select()
						.from(comment_vote)
						.where(
							and(eq(comment_vote.comment_id, c.parent_id), eq(comment_vote.user_id, c.creator_id))
						)
						.then((rows) => rows.at(0));
					return result ? result.vote : null;
				}
				const result = await db
					.select()
					.from(conversation_vote)
					.where(
						and(
							eq(conversation_vote.conversation_id, discussion.id),
							eq(conversation_vote.user_id, c.creator_id)
						)
					)
					.then((rows) => rows.at(0));
				return result ? result.vote : null;
			}
			let creator_vote = await get_vote(discussion);
			if (creator_vote === 'pass') {
				creator_vote = null;
			}

			function nice_trim(text: string, max: number) {
				const trimmed = text.slice(0, max - 3);
				if (trimmed.length !== text.length) {
					return `${trimmed}...`;
				}
				return text;
			}

			let parent_snippet = nice_trim(discussion.topic, 15);
			if (c.parent_id) {
				const parent = comments.find((p) => p.id === c.parent_id);
				if (!parent) {
					console.error('Failed to find comment parent');
					parent_snippet = '';
				} else {
					parent_snippet = nice_trim(parent.content, 15);
				}
			}

			return {
				...c,
				creator_vote,
				parent_snippet
			};
		})
	);
	return {
		discussion,
		comments: comments_with_author_votes,
		user
	};
};

export const actions = {
	vote_up_comment: async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		const slug = params.share_slug;
		if (!slug) {
			console.warn('no slug for new comment');
			return redirect(302, '/sms');
		}
		const discussion = await db
			.select()
			.from(conversation)
			.where(eq(conversation.share_slug, slug))
			.then((rows) => rows.at(0));
		if (!discussion) {
			console.warn('discussion not found for comment vote');
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const comment_id = formData.get('comment_id');
		if (!comment_id) {
			console.warn('no comment_id for new comment vote');
			return fail(400, { comment: comment_id, missing: true });
		}
		const newDetails: NewCommentVote = {
			user_id: session_user.id,
			comment_id: +comment_id,
			vote: 'agree'
		};
		console.info({ newDetails });
		try {
			await db
				.delete(comment_vote)
				.where(
					and(eq(comment_vote.user_id, session_user.id), eq(comment_vote.comment_id, +comment_id))
				);
		} catch {}
		const inserted = await db
			.insert(comment_vote)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newCommentVote] DB Insert did not return any rows';
		}
		return 'ok';
	},
	vote_down_comment: async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		const slug = params.share_slug;
		if (!slug) {
			console.warn('no slug for new comment vote');
			return redirect(302, '/sms');
		}
		const discussion = await db
			.select()
			.from(conversation)
			.where(eq(conversation.share_slug, slug))
			.then((rows) => rows.at(0));
		if (!discussion) {
			console.warn('discussion not found for comment vote');
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const comment_id = formData.get('comment_id');
		if (!comment_id) {
			return fail(400, { comment: comment_id, missing: true });
		}
		const newDetails: NewCommentVote = {
			user_id: session_user.id,
			comment_id: +comment_id,
			vote: 'disagree'
		};
		console.info({ newDetails });
		try {
			await db
				.delete(comment_vote)
				.where(
					and(eq(comment_vote.user_id, session_user.id), eq(comment_vote.comment_id, +comment_id))
				);
		} catch {}
		const inserted = await db
			.insert(comment_vote)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newCommentVote] DB Insert did not return any rows';
		}
		return 'ok';
	},
	vote_null_comment: async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		const slug = params.share_slug;
		if (!slug) {
			console.warn('no slug for new comment vote');
			return fail(404);
		}
		const discussion = await db
			.select()
			.from(conversation)
			.where(eq(conversation.share_slug, slug))
			.then((rows) => rows.at(0));
		if (!discussion) {
			console.warn('discussion not found for comment vote');
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const comment_id = formData.get('comment_id');
		if (!comment_id) {
			return fail(400, { comment: comment_id, missing: true });
		}
		const newDetails: NewCommentVote = {
			user_id: session_user.id,
			comment_id: +comment_id,
			vote: 'pass'
		};
		console.info({ newDetails });
		try {
			await db
				.delete(comment_vote)
				.where(
					and(eq(comment_vote.user_id, session_user.id), eq(comment_vote.comment_id, +comment_id))
				);
		} catch {}
		const inserted = await db
			.insert(comment_vote)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newCommentVote] DB Insert did not return any rows';
		}
		return 'ok';
	},
	comment: async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		const slug = params.share_slug;
		if (!slug) {
			console.warn('no slug for new comment');
			return fail(404);
		}
		const discussion = await db
			.select()
			.from(conversation)
			.where(eq(conversation.share_slug, slug))
			.then((rows) => rows.at(0));
		if (!discussion) {
			console.warn('discussion not found for new comment');
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const parent_id = formData.get('parent_id');
		const content = formData.get('comment');
		if (!content) {
			return fail(400, { comment: content, missing: true });
		}
		const show_creator_vote = formData.get('show-vote')?.toString() === 'on';
		const newDetails: NewComment = {
			content: content.toString(),
			creator_id: session_user.id,
			show_creator_vote,
			parent_id: parent_id ? +parent_id.toString() : null,
			conversation_id: discussion.id
		};
		console.info({ newDetails });
		const inserted = await db
			.insert(comment)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newComment] DB Insert did not return any rows';
		}
		return 'ok';
	},
	vote_up_conversation: async ({ cookies, request }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		if (!session_user) {
			console.warn('no slug for new comment');
			return redirect(302, '/sms');
		}
		const formData = await request.formData();
		const conversation_id = formData.get('conversation_id');
		if (!conversation_id) {
			return fail(400, { comment: conversation_id, missing: true });
		}
		const newDetails: NewConversationVote = {
			user_id: session_user.id,
			conversation_id: +conversation_id,
			vote: 'agree'
		};
		console.info({ newDetails });
		try {
			await db
				.delete(conversation_vote)
				.where(
					and(
						eq(conversation_vote.user_id, session_user.id),
						eq(conversation_vote.conversation_id, +conversation_id)
					)
				);
		} catch {}
		const inserted = await db
			.insert(conversation_vote)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newConvVote] DB Insert did not return any rows';
		}
		return 'ok';
	},
	vote_down_conversation: async ({ cookies, request }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		if (!session_user) {
			console.warn('no slug for new comment');
			return redirect(302, '/sms');
		}
		const formData = await request.formData();
		const conversation_id = formData.get('conversation_id');
		if (!conversation_id) {
			return fail(400, { comment: conversation_id, missing: true });
		}
		const newDetails: NewConversationVote = {
			user_id: session_user.id,
			conversation_id: +conversation_id,
			vote: 'disagree'
		};
		console.info({ newDetails });
		try {
			await db
				.delete(conversation_vote)
				.where(
					and(
						eq(conversation_vote.user_id, session_user.id),
						eq(conversation_vote.conversation_id, +conversation_id)
					)
				);
		} catch {}
		const inserted = await db
			.insert(conversation_vote)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newConvVote] DB Insert did not return any rows';
		}
		return 'ok';
	},
	vote_null_conversation: async ({ cookies, request }) => {
		const session_user = await getUserFromCookies(cookies);
		if (!session_user) {
			return redirect(302, '/sms');
		}
		if (!session_user) {
			console.warn('no slug for new comment');
			return redirect(302, '/sms');
		}
		const formData = await request.formData();
		const conversation_id = formData.get('conversation_id');
		if (!conversation_id) {
			return fail(400, { comment: conversation_id, missing: true });
		}
		const newDetails: NewConversationVote = {
			user_id: session_user.id,
			conversation_id: +conversation_id,
			vote: 'pass'
		};
		console.info({ newDetails });
		try {
			await db
				.delete(conversation_vote)
				.where(
					and(
						eq(conversation_vote.user_id, session_user.id),
						eq(conversation_vote.conversation_id, +conversation_id)
					)
				);
		} catch {}
		const inserted = await db
			.insert(conversation_vote)
			.values(newDetails)
			.returning()
			.then((rows) => rows.at(0));
		if (!inserted) {
			throw '[newConvVote] DB Insert did not return any rows';
		}
		return 'ok';
	}
} satisfies Actions;
