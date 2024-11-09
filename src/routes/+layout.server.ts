import { getUserFromCookies } from '@/server/utils';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const user = await getUserFromCookies(cookies);
	return {
		user
	};
};
