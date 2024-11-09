import { env } from '$env/dynamic/private';
import type { Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { sms_verification_codes } from '@/server/db/schema';

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
		const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
		const data = {
			from: 'Polly',
			to: (formData.get('to') as string) ?? '+358123456789',
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
	}
} satisfies Actions;
