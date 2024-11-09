import { env } from '$env/dynamic/private';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sms_verification_codes, user, session } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

const auth = Buffer.from(env.ELKS_USERNAME + ':' + env.ELKS_PASSWORD).toString('base64');

export const actions = {
	send: async ({ request }) => {
		if (env.DEMO_BYPASS) {
			console.log('Bypassed');
			return {
				status: 'created',
				direction: 'outgoing',
				from: 'YourCompany',
				created: '2024-05-04T13:37:42.314100',
				parts: 1,
				to: '+46700000000',
				cost: 5000,
				message: 'This is the message sent to the phone.',
				id: 's70df59406a1b4643b96f3f91e0bfb7b0'
			};
		}

		const formData = await request.formData();
		const phone = formData.get('to') as string;

		if (!phone) {
			return fail(400, { phone, missing: true });
		}

		const prevLogin = await db
			.select()
			.from(sms_verification_codes)
			.where(eq(sms_verification_codes.phone_number, phone));
		if (prevLogin.length > 0) {
			await db.delete(sms_verification_codes).where(eq(sms_verification_codes.phone_number, phone));
		}

		const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
		const data = {
			from: 'Polly',
			to: phone,
			message: `Your verification code is ${verificationCode}`
		};

		const dataParam = new URLSearchParams(data);

		console.log(dataParam.toString());

		const response = await fetch('https://api.46elks.com/a1/SMS', {
			method: 'POST',
			headers: {
				Authorization: `Basic ${auth}`
			},
			body: dataParam.toString()
		});

		await db.insert(sms_verification_codes).values({
			phone_number: data.to,
			code: verificationCode
		});

		return response.json();
	},
	verify: async ({ request }) => {
		const formData = await request.formData();
		const phone = formData.get('phone') as string;
		const code = formData.get('code') as string;

		if (!phone) {
			return fail(400, { phone, missing: true });
		}
		if (!code) {
			return fail(400, { code, missing: true });
		}

		if (code == env.DEMO_BYPASS) {
			return {
				status: 'verified'
			};
		}

		const verificationCode = await db
			.select()
			.from(sms_verification_codes)
			.where(eq(sms_verification_codes.phone_number, phone));

		if (verificationCode[0].code === code) {
			let existingUser = await db.select().from(user).where(eq(user.phone_number, phone));

			if (existingUser.length === 0) {
				existingUser = await db
					.insert(user)
					.values({
						phone_number: phone
					})
					.returning();
			}

			const createdSession = await db
				.insert(session)
				.values({
					user_id: existingUser[0].id
				})
				.returning();

			return {
				status: 'verified',
				session: createdSession[0],
				user: existingUser[0]
			};
		}

		return fail(400, { code, incorrect: true });
	}
} satisfies Actions;
