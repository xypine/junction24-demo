import {
	pgTable,
	text,
	serial,
	integer,
	date,
	pgEnum,
	boolean,
	foreignKey,
	primaryKey,
	uuid
} from 'drizzle-orm/pg-core';
import { GENDERS } from '../../schema_constants';

export const gender = pgEnum('gender', GENDERS);
export type Gender = (typeof GENDERS)[number];

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	admin: boolean('admin').notNull().default(false),
	phone_number: text('phonenumber').notNull(),

	birthyear: integer('yob'),
	municipality: text('municipality'),
	gender: gender('gender'),

	created_at: date('created_at').notNull().defaultNow(),
	updated_at: date('updated_at').notNull().defaultNow()
});
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type UpdateUserDetails = Omit<
	NewUser,
	'id' | 'admin' | 'phone_number' | 'created_at' | 'updated_at'
>;

export const sms_verification_codes = pgTable('sms_verification_code', {
	phone_number: text('phonenumber').notNull().primaryKey(),
	code: text('code').notNull()
});
export type SMSVerificationCode = typeof sms_verification_codes.$inferSelect;
export type NewSMSVerificationCode = typeof sms_verification_codes.$inferInsert;

export const session = pgTable('session', {
	id: uuid('id').primaryKey().defaultRandom(),
	user_id: integer('user_id').references(() => user.id),
	created_at: date('created_at').notNull().defaultNow()
});
export type Session = typeof session.$inferSelect;
export type NewSession = typeof session.$inferInsert;

export const conversation = pgTable('conversation', {
	id: serial('id').primaryKey(),
	creator_id: integer('creator_id')
		.notNull()
		.references(() => user.id),
	share_slug: text('share_slug').notNull(),

	topic: text('topic').notNull(),
	description: text('description'),

	participants_can_submit_comments: boolean('participants_can_submit_comments')
		.notNull()
		.default(true),
	show_explanations: boolean('show_explanations').notNull().default(true),
	prompt_subscription: boolean('prompt_subscription').notNull().default(true),

	show_unapproved_comments: boolean('show_unapproved_comments').notNull().default(true),

	created_at: date('created_at').notNull().defaultNow(),
	updated_at: date('updated_at').notNull().defaultNow()
});
export type Conversation = typeof conversation.$inferSelect;
export type NewConversation = typeof conversation.$inferInsert;

export const vote = pgEnum('vote', ['agree', 'disagree', 'pass']);
export const conversation_vote = pgTable(
	'conversation_vote',
	{
		conversation_id: integer('conversation_id')
			.notNull()
			.references(() => conversation.id),
		user_id: integer('user_id')
			.notNull()
			.references(() => user.id),
		vote: vote('vote')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.conversation_id, table.user_id] })
		};
	}
);
export type ConversationVote = typeof conversation_vote.$inferSelect;
export type NewConversationVote = typeof conversation_vote.$inferInsert;

export const comment = pgTable(
	'comment',
	{
		id: serial('id').primaryKey(),
		creator_id: integer('creator_id')
			.notNull()
			.references(() => user.id),
		conversation_id: integer('conversation_id').notNull().references(() => conversation.id),
		parent_id: integer('parent_id'),
		created_at: date('created_at').notNull().defaultNow(),
		updated_at: date('updated_at').notNull().defaultNow(),

		content: text('content').notNull(),
		show_creator_vote: boolean('show_creator_vote').notNull().default(false)
	},
	(table) => {
		return {
			parentReference: foreignKey({
				columns: [table.parent_id],
				foreignColumns: [table.id],
				name: 'parent_id_fk'
			})
		};
	}
);
export type Comment = typeof comment.$inferSelect;
export type NewComment = typeof comment.$inferInsert;

export const comment_vote = pgTable(
	'comment_vote',
	{
		comment_id: integer('comment_id')
			.notNull()
			.references(() => comment.id),
		user_id: integer('user_id')
			.notNull()
			.references(() => user.id),
		vote: vote('vote')
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.comment_id, table.user_id] })
		};
	}
);
export type CommentVote = typeof comment_vote.$inferSelect;
export type NewCommentVote = typeof comment_vote.$inferInsert;
