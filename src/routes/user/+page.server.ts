import { fail } from '@sveltejs/kit';
import { getUserFromCookies } from '@/server/utils';
import type { Actions } from './$types';
import { type Gender, type UpdateUserDetails, type User, user } from "@/server/db/schema";
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const actions = {
	"update_details": async ({request, cookies}) => {
		const session_user = await getUserFromCookies(cookies);
		if(!session_user) {
			return fail(401);
		}
		const formData = await request.formData();
		const birthyear = formData.get("birthyear");
		const municipality = formData.get("municipality");
		const gender = formData.get("gender");
		const newDetails: UpdateUserDetails = {
			birthyear: birthyear ? +birthyear : undefined,
			municipality: municipality ? municipality.toString() : undefined,
			gender: gender ? gender.toString() as Gender : undefined,
		};
		await db.update(user).set(newDetails).where(eq(user.id, session_user.id));
		return "ok";
	}
} satisfies Actions;
