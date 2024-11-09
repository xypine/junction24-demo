import { pgTable, text, integer, date, pgEnum, boolean, foreignKey } from 'drizzle-orm/pg-core';

export const gender = pgEnum('gender', ["male", "female", "other"]);

export const user = pgTable('user', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	admin: boolean('admin').notNull().default(false),
	phone_number: text('phonenumber').notNull(),

	birthyear: integer('yob'),
	municipality: text('municipality'),
	gender: gender('gender'),

	created_at: date('created_at').notNull().defaultNow(),
	updated_at: date('updated_at').notNull().defaultNow(),
});

export const sms_verification_codes = pgTable('sms_verification_code', {
	phone_number: text('phonenumber').notNull().primaryKey(),
	code: text('code').notNull()
});

export const conversation = pgTable('conversation', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	creator_id: integer('creator_id').notNull().references(() => user.id),
	share_slug: text('share_slug').notNull(),

	topic: text('topic').notNull(),
	description: text('description'),

	participants_can_submit_comments: boolean('participants_can_submit_comments').notNull().default(true),
	show_explanations: boolean('show_explanations').notNull().default(true),
	prompt_subscription: boolean('prompt_subscription').notNull().default(true),

	show_unapproved_comments: boolean('show_unapproved_comments').notNull().default(true),

	created_at: date('created_at').notNull().defaultNow(),
	updated_at: date('updated_at').notNull().defaultNow(),
});

export const comment = pgTable('comment', {
	id: integer('id').primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
	creator_id: integer('creator_id').notNull().references(() => user.id),
	parent_id: integer('parent_id'),
	created_at: date('created_at').notNull().defaultNow(),
	updated_at: date('updated_at').notNull().defaultNow(),

	content: text('content').notNull(),
	show_creator_vote: boolean('show_creator_vote').notNull().default(false)
}, (table) => {
	return {
		parentReference: foreignKey({
			columns: [table.parent_id],
			foreignColumns: [table.id],
			name: "parent_id_fk"
		}),
	};
});
