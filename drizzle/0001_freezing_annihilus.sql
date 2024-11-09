CREATE TABLE IF NOT EXISTS "conversation_vote" (
	"conversation_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"vote" "vote",
	CONSTRAINT "conversation_vote_conversation_id_user_id_pk" PRIMARY KEY("conversation_id","user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation_vote" ADD CONSTRAINT "conversation_vote_conversation_id_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation_vote" ADD CONSTRAINT "conversation_vote_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
