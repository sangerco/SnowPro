-- Inserting sample users
INSERT INTO users (id, username, first_name, last_name, email, password, avatar, bio, is_admin)
VALUES
  ('11', 'john_doe', 'John', 'Doe', 'john@example.com', 'password123', NULL, 'Sample bio for John Doe.', true),
  ('22', 'jane_smith', 'Jane', 'Smith', 'jane@example.com', 'password456', NULL, 'Sample bio for Jane Smith.', false),
  ('33', 'mike_jones', 'Mike', 'Jones', 'mike@example.com', 'password789', NULL, 'Sample bio for Mike Jones.', false),
  ('44', 'susan_brown', 'Susan', 'Brown', 'susan@example.com', 'password987', NULL, 'Sample bio for Susan Brown.', false);

-- Inserting sample ski areas
INSERT INTO ski_areas (slug, name)
VALUES
  ('ski-area-1', 'Mountain Resort 1'),
  ('ski-area-2', 'Hilltop Ski Resort'),
  ('ski-area-3', 'Alpine Paradise'),
  ('ski-area-4', 'Snowy Peaks Resort');

-- Inserting sample reviews
INSERT INTO reviews (id, user_id, username, ski_area_slug, header, body, stars, photos, tag_ids, created_at)
VALUES
  ('review-1', '11', 'john_doe', 'ski-area-1', 'Amazing Experience', 'Had a fantastic time at this resort!', 5, NULL, NULL, NOW()),
  ('review-2', '22', 'jane_smith', 'ski-area-2', 'Great Skiing Spot', 'The skiing trails are excellent here.', 4, NULL, NULL, NOW()),
  ('review-3', '33', 'mike_jones', 'ski-area-3', 'Incredible Views', 'Scenic beauty everywhere!', 5, NULL, NULL, NOW()),
  ('review-4', '44', 'susan_brown', 'ski-area-4', 'Perfect for Families', 'A family-friendly resort with lots of activities.', 4, NULL, NULL, NOW());

-- Inserting sample tags
INSERT INTO tags (id, tag)
VALUES
  ('tag-1', 'Adventure'),
  ('tag-2', 'Family-Friendly'),
  ('tag-3', 'Scenic Views'),
  ('tag-4', 'Snowboarding');

-- Inserting sample review tags
INSERT INTO review_tags (review_id, tag_id)
VALUES
  ('review-1', 'tag-1'),
  ('review-1', 'tag-2'),
  ('review-2', 'tag-3'),
  ('review-3', 'tag-4');

-- Inserting sample photos
INSERT INTO photos (id, user_id, link, about, tag_ids, created_at)
VALUES
  ('photo-1', '11', 'https://example.com/photo1.jpg', 'Skiing at Mountain Resort 1', 'tag-1', NOW()),
  ('photo-2', '22', 'https://example.com/photo2.jpg', 'Beautiful views at Hilltop Ski Resort', 'tag-3', NOW()),
  ('photo-3', '33', 'https://example.com/photo3.jpg', 'Snowy Peaks Resort adventure', 'tag-1', NOW()),
  ('photo-4', '44', 'https://example.com/photo4.jpg', 'Family fun at Alpine Paradise', 'tag-2', NOW());

-- Inserting sample videos
INSERT INTO videos (id, user_id, link, about, tag_ids, created_at)
VALUES
  ('video-1', '11', 'https://youtube.com/video1', 'Snowboarding adventure', 'tag-1', NOW()),
  ('video-2', '22', 'https://youtube.com/video2', 'Skiing highlights', 'tag-2', NOW()),
  ('video-3', '33', 'https://youtube.com/video3', 'Ski tricks and tips', 'tag-4', NOW()),
  ('video-4', '44', 'https://youtube.com/video4', 'Alpine Paradise tour', 'tag-3', NOW());

-- Inserting sample favorite mountains
INSERT INTO fav_mountains (user_id, ski_area_slug)
VALUES
  ('11', 'ski-area-1'),
  ('22', 'ski-area-2'),
  ('33', 'ski-area-3'),
  ('44', 'ski-area-4');

-- Inserting sample review replies
INSERT INTO review_replies (id, review_id, user_id, ski_area_slug, body, created_at)
VALUES
  ('review-reply-1', 'review-1', '22', 'ski-area-1', 'Glad you had a great time!', NOW()),
  ('review-reply-2', 'review-2', '11', 'ski-area-2', 'Thanks for the recommendation!', NOW()),
  ('review-reply-3', 'review-3', '44', 'ski-area-3', 'Yes, the views are breathtaking!', NOW()),
  ('review-reply-4', 'review-4', '33', 'ski-area-4', 'It was indeed family-friendly!', NOW());

-- Inserting sample messages
INSERT INTO messages (id, sender_id, recipient_id, subject, body, is_read, created_at)
VALUES
  ('message-1', '11', '22', 'Greetings', 'Hello Jane! How are you?', true, NOW()),
  ('message-2', '22', '11', 'Re: Greetings', 'Hi John! I''m doing well, thank you.', false, NOW()),
  ('message-3', '33', '44', 'Question about resorts', 'Hi Susan, I have a question about resorts. Can you help?', false, NOW()),
  ('message-4', '44', '33', 'Re: Question about resorts', 'Of course! I''d be happy to help.', false, NOW());

-- Inserting sample message replies
INSERT INTO message_replies (id, message_id, sender_id, recipient_id, subject, body, is_read, created_at)
VALUES
  ('message-reply-1', 'message-1', '22', '11', 'Re: Greetings', 'Hello John! I''m glad to hear you''re doing well.', true, NOW()),
  ('message-reply-2', 'message-2', '11', '22', 'Re: Re: Greetings', 'Thanks Jane! Let''s catch up soon.', false, NOW()),
  ('message-reply-3', 'message-3', '44', '33', 'Re: Question about resorts', 'Of course! What do you need help with?', false, NOW()),
  ('message-reply-4', 'message-4', '33', '44', 'Re: Re: Question about resorts', 'Thank you! I appreciate your help.', false, NOW());
