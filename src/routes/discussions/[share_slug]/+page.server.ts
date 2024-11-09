import { db } from "@/server/db";
import type { PageServerLoad } from "./$types";
import { comment, comment_vote, conversation, type NewComment, type NewCommentVote } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { getUserFromCookies } from "@/server/utils";

export const load: PageServerLoad = async ({ params }) => {
	const share_slug = params.share_slug;
	const discussion = await db.select().from(conversation).where(eq(conversation.share_slug, share_slug)).then(rows => rows.at(0));
	if(!discussion) {
		error(404, {
			message: 'Not found'
		});
	}
	const comments = await db.select().from(comment).where(eq(comment.conversation_id, discussion.id));
	return {
		discussion,
		comments
	};
};

export const actions = {
	"vote_up": async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		const slug = params.share_slug;
		if(!slug) {
			console.warn("no slug for new comment");
			return fail(404);
		}
		const discussion = await db.select().from(conversation).where(eq(conversation.share_slug, slug)).then(rows => rows.at(0));
		if(!discussion) {
			console.warn("discussion not found for comment vote");
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const comment_id = formData.get("comment_id");
		if(!comment_id) {
			return fail(400, { comment: comment_id, missing: true });
		}
		const newDetails: NewCommentVote = {
			user_id: session_user.id,
			comment_id: +comment_id,
			vote: "agree"
		};
		console.info({ newDetails });
		const inserted = await db.insert(comment_vote).values(newDetails).returning().then(rows => rows.at(0));
		if(!inserted) {
			throw "[newCommentVote] DB Insert did not return any rows";
		}
		return "ok";
	},
	"vote_down": async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		const slug = params.share_slug;
		if(!slug) {
			console.warn("no slug for new comment vote");
			return fail(404);
		}
		const discussion = await db.select().from(conversation).where(eq(conversation.share_slug, slug)).then(rows => rows.at(0));
		if(!discussion) {
			console.warn("discussion not found for comment vote");
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const comment_id = formData.get("comment_id");
		if(!comment_id) {
			return fail(400, { comment: comment_id, missing: true });
		}
		const newDetails: NewCommentVote = {
			user_id: session_user.id,
			comment_id: +comment_id,
			vote: "disagree"
		};
		console.info({ newDetails });
		const inserted = await db.insert(comment_vote).values(newDetails).returning().then(rows => rows.at(0));
		if(!inserted) {
			throw "[newCommentVote] DB Insert did not return any rows";
		}
		return "ok";
	},
	"comment": async ({ cookies, request, params }) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		const slug = params.share_slug;
		if(!slug) {
			console.warn("no slug for new comment");
			return fail(404);
		}
		const discussion = await db.select().from(conversation).where(eq(conversation.share_slug, slug)).then(rows => rows.at(0));
		if(!discussion) {
			console.warn("discussion not found for new comment");
			error(404, {
				message: 'Discussion Not Found'
			});
		}
		const formData = await request.formData();
		const parent_id = formData.get("parent_id");
		const content = formData.get("comment");
		if(!content) {
			return fail(400, { comment: content, missing: true });
		}
		const show_creator_vote = formData.get("show-vote")?.toString() === "true";
		const newDetails: NewComment = {
			content: content.toString(),
			creator_id: session_user.id,
			show_creator_vote,
			parent_id: parent_id ? +parent_id.toString() : null,
			conversation_id: discussion.id,
		};
		console.info({ newDetails });
		const inserted = await db.insert(comment).values(newDetails).returning().then(rows => rows.at(0));
		if(!inserted) {
			throw "[newComment] DB Insert did not return any rows";
		}
		return "ok";
	}
} satisfies Actions;
