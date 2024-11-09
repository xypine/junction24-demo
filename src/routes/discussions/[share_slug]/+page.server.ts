import { db } from "@/server/db";
import type { PageServerLoad } from "./$types";
import { conversation } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const share_slug = params.share_slug;
	const discussion = await db.select().from(conversation).where(eq(conversation.share_slug, share_slug)).then(rows => rows.at(0));
	if(!discussion) {
		error(404, {
			message: 'Not found'
		});
	}
	return {
		discussion
	};
};
