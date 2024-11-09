import { fail } from '@sveltejs/kit';
import { getUserFromCookies } from '@/server/utils';
import type { Actions } from './$types';
import { type Gender, type UpdateUserDetails, type User, user } from "@/server/db/schema";
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({request, cookies}) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		const formData = await request.formData();
		const topic = formData.get("topic");
		const description = formData.get("description");
		const can_submit_comments = formData.get("can-submit");
		const show_unapproved = formData.get("show-unapproved");
		//const newDetails: UpdateUserDetails = {
		//	birthyear: birthyear ? +birthyear : null,
		//	municipality: municipality ? municipality.toString() : null,
		//	gender: gender ? gender.toString() as Gender : null,
		//};
		//console.info({ newDetails });
		//await db.update(user).set(newDetails).where(eq(user.id, session_user.id));
		return "ok";
	}
} satisfies Actions;
