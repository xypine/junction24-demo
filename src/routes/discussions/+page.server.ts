import { db } from "@/server/db";
import type { PageServerLoad } from "./$types";
import { conversation } from "@/server/db/schema";

export const load: PageServerLoad = async () => {
	const discussions = await db.select().from(conversation).orderBy(conversation.created_at);
	return {
		discussions
	};
};
