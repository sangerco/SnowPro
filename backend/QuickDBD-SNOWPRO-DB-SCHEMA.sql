-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/bTP83U
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

DROP DATABASE snowpro;

CREATE DATABASE snowpro;

\c snowpro;

CREATE TABLE "users" (
    "id" text   NOT NULL UNIQUE,
    "username" varchar(25)   NOT NULL,
    "first_name" text   NOT NULL,
    "last_name" text   NOT NULL,
    "email" text   NOT NULL,
    "password" text   NOT NULL,
    "avatar" text   NULL,
    "bio" varchar(1000)   NULL,
    "is_admin" text NULL,
    CONSTRAINT "pk_User" PRIMARY KEY ("id"),
    CONSTRAINT "uc_User_username" UNIQUE ("username")
);

CREATE TABLE "ski_areas" (
    "slug" text  NOT NULL,
    "name" text   NOT NULL,
    CONSTRAINT "pk_Ski_areas" PRIMARY KEY ("slug")
);

CREATE TABLE "reviews" (
    "id" text   NOT NULL,
    "user_id" text   NOT NULL,
    "ski_area_slug" text  NOT NULL,
    "header" text  NOT NULL,
    "body" varchar(500)   NULL,
    "stars" int   NOT NULL,
    "photos" text   NULL,
    "tag_ids" text NULL,
    "created_at" TIMESTAMP NOT NULL,
    CONSTRAINT "pk_reviews" PRIMARY KEY ("id")
);

CREATE TABLE "review_replies" (
    "id" text   NOT NULL,
    "review_id" text   NOT NULL,
    "user_id" text   NOT NULL,
    "ski_area_slug" text   NOT NULL,
    "body" varchar(500)   NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    CONSTRAINT "pk_review_replies" PRIMARY KEY ("id")
);

CREATE TABLE "messages" (
    "id" text   NOT NULL,
    "sender_id" text   NOT NULL,
    "recipient_id" text   NOT NULL,
    "subject" text  NULL,
    "body" varchar(500)   NOT NULL,
    "is_read" boolean NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    CONSTRAINT "pk_messages" PRIMARY KEY ("id")
);

CREATE TABLE "message_replies" (
    "id" text  NOT NULL,
    "message_id" text NOT NULL,
    "sender_id" text NOT NULL,
    "recipient_id" text NOT NULL,
    "subject" text NULL,
    "body" varchar(500)  NOT NULL,
    "is_read" boolean NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    CONSTRAINT "pk_message_replies" PRIMARY KEY ("id")
);

CREATE TABLE "tags" (
    "id" text   NOT NULL,
    "tag" varchar(15)   NOT NULL,
    CONSTRAINT "pk_tags" PRIMARY KEY ("id")
);

CREATE TABLE "photos" (
    "id" text   NOT NULL,
    "user_id" text   NOT NULL,
    "link" text   NOT NULL,
    "about" text NULL,
    "tag_ids" text NULL,
    "created_at" TIMESTAMP NOT NULL,
    CONSTRAINT "pk_photos" PRIMARY KEY ("id")
);

CREATE TABLE "videos" (
    "id" text   NOT NULL,
    "user_id" text   NOT NULL,
    "link" text   NULL,
    "about" text NULL,
    "tag_ids" text NULL,
    "created_at" TIMESTAMP NOT NULL,
    CONSTRAINT "pk_videos" PRIMARY KEY ("id")
);

CREATE TABLE "fav_mountains" (
    "user_id" TEXT
        REFERENCES "users" ("id") ON DELETE CASCADE,
    "ski_area_slug" TEXT
        REFERENCES "ski_areas" ("slug") ON DELETE CASCADE,
    PRIMARY KEY ("user_id", "ski_area_slug")
);

CREATE TABLE review_tags (
    "review_id" TEXT 
        REFERENCES "reviews" ("id") ON DELETE CASCADE,
    "tag_id" TEXT 
        REFERENCES "tags" ("id") ON DELETE CASCADE,
    PRIMARY KEY ("review_id", "tag_id")
);

CREATE TABLE photos_tags (
    "photo_id" TEXT 
        REFERENCES "photos" ("id") ON DELETE CASCADE,
    "tag_id" TEXT 
        REFERENCES "tags" ("id") ON DELETE CASCADE,
    PRIMARY KEY ("photo_id", "tag_id")
);

CREATE TABLE videos_tags (
    "video_id" TEXT 
        REFERENCES "videos" ("id") ON DELETE CASCADE,
    "tag_id" TEXT 
        REFERENCES "tags" ("id") ON DELETE CASCADE,
    PRIMARY KEY ("video_id", "tag_id")
);

CREATE TABLE users_photos (
    "user_id" TEXT
        REFERENCES "users" ("id") ON DELETE CASCADE,
    "photo_id" TEXT
        REFERENCES "photos" ("id") ON DELETE CASCADE,
    PRIMARY KEY ("user_id", "photo_id")
);

CREATE TABLE reviews_photos (
    "review_id" TEXT
        REFERENCES "reviews" ("id") ON DELETE CASCADE,
    "photo_id" TEXT
        REFERENCES "photos" ("id") ON DELETE CASCADE,
    PRIMARY KEY ("review_id", "photo_id")
);

CREATE TABLE users_videos (
    "user_id" TEXT
        REFERENCES "users" ("id") ON DELETE CASCADE,
    "video_id" TEXT
        REFERENCES "videos" ("id") ON DELETE CASCADE,
    PRIMARY KEY ("user_id", "video_id")
);

ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "message_replies" ADD CONSTRAINT "fk_message_replies" FOREIGN KEY("message_id")
REFERENCES "messages" ("id");

ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews_ski_area_slug" FOREIGN KEY("ski_area_slug")
REFERENCES "ski_areas" ("slug");

ALTER TABLE "reviews" ADD CONSTRAINT "fk_reviews_tag_ids" FOREIGN KEY("tag_ids")
REFERENCES "tags" ("id");

ALTER TABLE "review_replies" ADD CONSTRAINT "fk_review_replies_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "messages" ADD CONSTRAINT "fk_messages_sender_id" FOREIGN KEY("sender_id")
REFERENCES "users" ("id");

ALTER TABLE "messages" ADD CONSTRAINT "fk_messages_recipient_id" FOREIGN KEY("recipient_id")
REFERENCES "users" ("id");

ALTER TABLE "photos" ADD CONSTRAINT "fk_photos_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "photos" ADD CONSTRAINT "fk_photos_tag_id" FOREIGN KEY("tag_ids")
REFERENCES "tags" ("id");

ALTER TABLE "videos" ADD CONSTRAINT "fk_videos_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "videos" ADD CONSTRAINT "fk_videos_tag_id" FOREIGN KEY("tag_ids")
REFERENCES "tags" ("id");

ALTER TABLE "fav_mountains" ADD CONSTRAINT "fk_fav_mountains_user_id" FOREIGN KEY("user_id")
REFERENCES "users" ("id");

ALTER TABLE "fav_mountains" ADD CONSTRAINT "fk_fav_mountains_ski_areas_slug" FOREIGN KEY("ski_areas_slug")
REFERENCES "ski_areas" ("slug");

ALTER TABLE "messages" ADD COLUMN "is_read" BOOLEAN DEFAULT false;

ALTER TABLE "message_replies" ADD COLUMN "is_read" BOOLEAN DEFAULT false;
