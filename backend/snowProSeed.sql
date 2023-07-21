-- Insert dummy data for the "users" table
INSERT INTO "users" ("id", "username", "first_name", "last_name", "email", "password", "avatar", "bio")
VALUES ('1', 'john', 'John', 'Doe', 'john@example.com', 'password123', NULL, NULL),
       ('2', 'jane', 'Jane', 'Smith', 'jane@example.com', 'password456', NULL, NULL);

-- Insert dummy data for the "ski_areas" table
INSERT INTO "ski_areas" ("slug", "name")
VALUES ('ski-area-1', 'Ski Area 1'),
       ('ski-area-2', 'Ski Area 2');

-- Insert dummy data for the "reviews" table
INSERT INTO "reviews" ("id", "user_id", "ski_area_slug", "body", "stars", "photos", "tag_ids")
VALUES ('1', '1', 'ski-area-1', 'Great ski experience!', 5, NULL, NULL),
       ('2', '2', 'ski-area-2', 'Awesome slopes!', 4, NULL, NULL);

-- Insert dummy data for the "review_replies" table
INSERT INTO "review_replies" ("id", "review_id", "user_id", "body")
VALUES ('1', '1', '2', 'Glad you enjoyed it!');

-- Insert dummy data for the "messages" table
INSERT INTO "messages" ("id", "sender_id", "recipient_id", "subject", "body")
VALUES ('1', '1', '2', 'Hi', 'Hello Jane! How are you?'),
       ('2', '2', '1', 'Hi back!','Hi John! I''m doing great.');

-- Insert dummy data for the "tags" table
INSERT INTO "tags" ("id", "tag")
VALUES ('1', 'tag1'),
       ('2', 'tag2');

-- Insert dummy data for the "photos" table
INSERT INTO "photos" ("id", "user_id", "link", "about", "tag_ids")
VALUES ('1', '1', 'photo-link1', 'A beautiful view', '1'),
       ('2', '2', 'photo-link2', 'Snowy mountains', '2');

-- Insert dummy data for the "videos" table
INSERT INTO "videos" ("id", "user_id", "link", "about", "tag_ids")
VALUES ('1', '1', 'video-link1', 'Ski tricks', '1'),
       ('2', '2', 'video-link2', 'Slope ride', '2');

-- Insert dummy data for the "fav_mountains" table
INSERT INTO "fav_mountains" ("user_id", "ski_areas_slug")
VALUES ('1', 'ski-area-1'),
       ('2', 'ski-area-2');
