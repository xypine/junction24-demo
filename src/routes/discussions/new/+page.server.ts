import { getUserFromCookies } from '@/server/utils';
import type { Actions } from './$types';
import { conversation, type NewConversation, user } from "@/server/db/schema";
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';

function generateSlug() {
	return Math.round(Math.random() * 100000).toString().padStart(6, "0");
}

export const actions = {
	default: async ({request, cookies}) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		const formData = await request.formData();
		const topic = formData.get("topic");
		if(!topic) {
			return fail(400, { topic, missing: true });
		}
		const description = formData.get("description");
		const can_submit_comments = formData.get("can-submit");
		if(can_submit_comments === null) {
			return fail(400, { can_submit_comments, missing: true });
		}
		const show_unapproved = formData.get("show-unapproved");
		if(show_unapproved === null) {
			return fail(400, { can_submit_comments, missing: true });
		}
		const newDetails: NewConversation = {
			creator_id: session_user.id,
			topic: topic.toString(),
			description: description ? description.toString() : null,
			share_slug: generateSlug(),
			show_explanations: true,
			prompt_subscription: true,
			participants_can_submit_comments: can_submit_comments.toString() === "true",
			show_unapproved_comments: show_unapproved.toString() === "true",
		};
		console.info({ newDetails });
		const inserted = await db.insert(conversation).values(newDetails).returning().then(rows => rows.at(0));
		if(!inserted) {
			throw "[newTopic] DB Insert did not return any rows";
		}
		redirect(302, `/discussions/${inserted.share_slug}`);
	}
} satisfies Actions;
