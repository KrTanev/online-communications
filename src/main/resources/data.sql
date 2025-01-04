INSERT INTO USERS (id, username, password, email, created_at)
VALUES 
(1, 'ivan_petrov', 'password123', 'ivan.petrov@example.com', CURRENT_TIMESTAMP),
(2, 'maria_ivanova', 'password123', 'maria.ivanova@example.com', CURRENT_TIMESTAMP),
(3, 'georgi_todorov', 'password123', 'georgi.todorov@example.com', CURRENT_TIMESTAMP),
(4, 'peter_dimitrov', 'password123', 'peter.dimitrov@example.com', CURRENT_TIMESTAMP);

INSERT INTO CHANNELS (id, name, owner_id, created_at)
VALUES 
(1, 'general', 1, CURRENT_TIMESTAMP),
(2, 'sports', 2, CURRENT_TIMESTAMP),
(3, 'technology', 3, CURRENT_TIMESTAMP);

INSERT INTO CHANNEL_MEMBERS (id, channel_id, user_id, role, added_by, joined_at)
VALUES 
(1, 1, 1, 'OWNER', NULL, CURRENT_TIMESTAMP),
(2, 1, 2, 'MEMBER', 1, CURRENT_TIMESTAMP),
(3, 2, 2, 'OWNER', NULL, CURRENT_TIMESTAMP),
(4, 2, 3, 'MEMBER', 2, CURRENT_TIMESTAMP),
(5, 3, 3, 'OWNER', NULL, CURRENT_TIMESTAMP),
(6, 3, 4, 'MEMBER', 3, CURRENT_TIMESTAMP);

INSERT INTO MESSAGES (id, sender_id, recipient_channel_id, message, created_at)
VALUES 
(1, 1, 1, 'Добре дошли в основния канал!', CURRENT_TIMESTAMP),
(2, 2, 2, 'На някой играе ли му се нещо?', CURRENT_TIMESTAMP),
(3, 3, 3, 'Какъв ще е теста по ит?', CURRENT_TIMESTAMP);

INSERT INTO FRIENDS (id, friend_id_one, friend_id_two, created_at)
VALUES 
(1, 1, 2, CURRENT_TIMESTAMP),
(2, 1, 3, CURRENT_TIMESTAMP),
(3, 2, 3, CURRENT_TIMESTAMP),
(4, 3, 4, CURRENT_TIMESTAMP);
