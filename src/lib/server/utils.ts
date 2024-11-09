import type { Cookies } from "@sveltejs/kit";
import { comment_vote, conversation_vote, session, user, type CommentVote, type ConversationVote, type Session, type User } from "@/server/db/schema";
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const SESSION_COOKIE_NAME = 'session' as const;
export type SessionWithUser = User & {
	session_id: Session["id"],
	conversation_votes: ConversationVote[],
	comment_votes: CommentVote[]
};

export async function getUserFromCookies(cookies: Cookies): Promise<SessionWithUser | null> {
	const session_id = cookies.get(SESSION_COOKIE_NAME);
	if(!session_id) {
		return null;
	}
	const select_result = await db
		.select()
		.from(session)
		.where(eq(session.id, session_id))
		.innerJoin(user, eq(session.user_id, user.id))
		.then(rows => rows.at(0));

	if(!select_result) {
		console.warn("couldn't find session", { session_id });
		return null;
	}
	const conversation_votes = await db.select().from(conversation_vote).where(eq(conversation_vote.user_id, select_result.user.id));
	const comment_votes = await db.select().from(comment_vote).where(eq(comment_vote.user_id, select_result.user.id));
	return {
		...select_result.user,
		session_id: select_result.session.id,
		conversation_votes,
		comment_votes
	}
}
