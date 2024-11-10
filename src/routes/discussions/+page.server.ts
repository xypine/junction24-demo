import { db } from '@/server/db';
import type { Actions, PageServerLoad } from './$types';
import {
	comment,
	conversation,
	conversation_vote,
	type NewConversationVote
} from '@/server/db/schema';
import { getUserFromCookies } from '@/server/utils';
import { fail, redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
	const discussions = await db.select().from(conversation).orderBy(conversation.created_at);
	const discussions_with_comments = await Promise.all(
		discussions.map(async (d) => {
			return {
				...d,
				comments: (await db.select().from(comment).where(eq(comment.conversation_id, d.id))).length // forgive me
			};
		})
	);
	return {
		discussions: discussions_with_comments
	};
};

export const actions = {
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
			throw '[newConvId] DB Insert did not return any rows';
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
			throw '[newConvId] DB Insert did not return any rows';
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
			throw '[newConvId] DB Insert did not return any rows';
		}
		return 'ok';
	}
} satisfies Actions;
