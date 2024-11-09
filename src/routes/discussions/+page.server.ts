import { db } from "@/server/db";
import type { Actions, PageServerLoad } from "./$types";
import { conversation, conversation_vote, type NewConversationVote } from "@/server/db/schema";
import { getUserFromCookies } from "@/server/utils";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
	const discussions = await db.select().from(conversation).orderBy(conversation.created_at);
	return {
		discussions
	};
};

export const actions = {
	"vote_up": async ({ cookies, request }) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		if(!session_user) {
			console.warn("no slug for new comment");
			return fail(404);
		}
		const formData = await request.formData();
		const conversation_id = formData.get("conversation_id");
		if(!conversation_id) {
			return fail(400, { comment: conversation_id, missing: true });
		}
		const newDetails: NewConversationVote = {
			user_id: session_user.id,
			conversation_id: +conversation_id,
			vote: "agree"
		};
		console.info({ newDetails });
		const inserted = await db.insert(conversation_vote).values(newDetails).returning().then(rows => rows.at(0));
		if(!inserted) {
			throw "[newConvId] DB Insert did not return any rows";
		}
		return "ok";
	},
	"vote_down": async ({ cookies, request }) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		if(!session_user) {
			console.warn("no slug for new comment");
			return fail(404);
		}
		const formData = await request.formData();
		const conversation_id = formData.get("conversation_id");
		if(!conversation_id) {
			return fail(400, { comment: conversation_id, missing: true });
		}
		const newDetails: NewConversationVote = {
			user_id: session_user.id,
			conversation_id: +conversation_id,
			vote: "disagree"
		};
		console.info({ newDetails });
		const inserted = await db.insert(conversation_vote).values(newDetails).returning().then(rows => rows.at(0));
		if(!inserted) {
			throw "[newConvId] DB Insert did not return any rows";
		}
		return "ok";
	},
} satisfies Actions;
