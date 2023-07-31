-- Dummy data for users table
INSERT INTO "users" ("id", "username", "first_name", "last_name", "email", "password", "avatar", "bio", "is_admin")
VALUES
    ('1', 'user1', 'John', 'Doe', 'john.doe@example.com', 'password1', NULL, 'I love skiing!', NULL),
    ('2', 'user2', 'Jane', 'Smith', 'jane.smith@example.com', 'password2', NULL, 'Skiing is my passion.', NULL),
    ('3', 'admin', 'Admin', 'User', 'admin@example.com', 'admin123', NULL, NULL, 'true');

-- Dummy data for ski_areas table
INSERT INTO "ski_areas" ("slug", "name")
VALUES
    ('alpine', 'Alpine Resort'),
    ('snowy', 'Snowy Slopes'),
    ('powder', 'Powder Paradise');

-- Dummy data for tags table
INSERT INTO "tags" ("id", "tag")
VALUES
    ('1', 'Beginner'),
    ('2', 'Intermediate'),
    ('3', 'Advanced');

-- Dummy data for reviews table
INSERT INTO "reviews" ("id", "user_id", "ski_area_slug", "body", "stars", "photos", "tag_ids", "created_at")
VALUES
    ('101', '1', 'alpine', 'Great resort!', 5, NULL, NULL, '2023-07-26 12:34:56'),
    ('102', '2', 'snowy', 'Nice slopes.', 4, NULL, '1', '2023-07-25 10:11:12'),
    ('103', '1', 'powder', 'Amazing powder!', 5, NULL, '2', '2023-07-24 08:09:10');

-- Dummy data for review_replies table
INSERT INTO "review_replies" ("id", "review_id", "user_id", "body", "created_at")
VALUES
    ('201', '101', '2', 'Glad you enjoyed it!', '2023-07-26 12:36:00'),
    ('202', '102', '1', 'Thanks for the review!', '2023-07-25 10:15:00'),
    ('203', '103', '2', 'Powder days are the best!', '2023-07-24 08:11:00');

-- Dummy data for messages table
INSERT INTO "messages" ("id", "sender_id", "recipient_id", "subject", "body", "created_at")
VALUES
    ('301', '1', '2', 'Hello!', 'Let''s plan a ski trip.', '2023-07-26 12:40:00'),
    ('302', '2', '1', 'Re: Hello!', 'Sure, when do you want to go?', '2023-07-26 12:42:00');

-- Dummy data for message_replies table
INSERT INTO "message_replies" ("id", "message_id", "sender_id", "recipient_id", "subject", "body", "created_at")
VALUES
    ('401', '301', '2', '1', 'Re: Hello!', 'Sounds good! How about next weekend?', '2023-07-26 12:43:00'),
    ('402', '302', '1', '2', 'Re: Re: Hello!', 'Next weekend works for me.', '2023-07-26 12:45:00');

-- Dummy data for photos table
INSERT INTO "photos" ("id", "user_id", "link", "about", "tag_ids", "created_at")
VALUES
    ('501', '1', 'https://example.com/photo1.jpg', 'Skiing down the mountain.', NULL, '2023-07-26 12:50:00'),
    ('502', '2', 'https://example.com/photo2.jpg', 'Enjoying the view.', '2', '2023-07-26 12:52:00');

-- Dummy data for videos table
INSERT INTO "videos" ("id", "user_id", "link", "about", "tag_ids", "created_at")
VALUES
    ('601', '1', 'https://example.com/video1.mp4', 'Amazing ski jump!', '3', '2023-07-26 12:55:00'),
    ('602', '2', 'https://example.com/video2.mp4', 'Skiing in powder.', NULL, '2023-07-26 12:58:00');

-- Dummy data for fav_mountains table
INSERT INTO "fav_mountains" ("user_id", "ski_areas_slug")
VALUES
    ('1', 'alpine'),
    ('2', 'powder'),
    ('1', 'snowy');

