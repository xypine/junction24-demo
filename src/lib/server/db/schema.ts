import { pgTable, text, integer, date, pgEnum } from 'drizzle-orm/pg-core';

export const gender = pgEnum('gender', ["male", "female", "other"]);

export const user = pgTable('user', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	phone_number: text('phonenumber'),

	birthyear: integer('yob'),
	municipality: text('municipality'),
	gender: gender('gender'),

	created_at: date('created_at'),
	updated_at: date('updated_at'),
});
