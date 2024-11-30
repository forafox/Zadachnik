
INSERT INTO "user" (username, full_name, password) VALUES
('jdoe', 'John Doe', 'hash'),
('asmith', 'Alice Smith', 'password'),
('bjones', 'Bob Jones', 'password');


INSERT INTO team (title, scrum_master) VALUES
('Alpha Team', 1),
('Beta Team', 2);


INSERT INTO product (short_name, title, description, owner) VALUES
('prod1', 'Product 1', 'Description for Product 1', 1),
('prod2', 'Product 2', 'Description for Product 2', 2);


INSERT INTO sprint (team_id) VALUES
(1),
(2);


INSERT INTO comment (author, content) VALUES
(1, 'This is a comment by John'),
(2, 'This is a comment by Alice');


INSERT INTO team_meeting (title, agenda, team_id) VALUES
('Planning Meeting', 'Discussing plans', 1),
('Review Meeting', 'Reviewing progress', 2);


INSERT INTO article (author) VALUES
(1),
(3);


INSERT INTO product_release (product_id, sprint_id, notes) VALUES
(1, 1, 1),
(2, 2, 2);


INSERT INTO release_changelog_entry (release_id, task_id, type, comment) VALUES
(1, 1, 'Added', 'Initial release tasks'),
(2, 2, 'Fixed', 'Bug fixes included in this release');


INSERT INTO task (type, title, description, product_id) VALUES
('EPIC', 'Epic Task 1', 'Epic task description', 1),
('STORY', 'Story Task 1', 'Story task description', 1),
('TASK', 'Task 1', 'Regular task description', 2);


INSERT INTO task_relation (type, parent, child) VALUES
('dependency', 1, 2),
('subtask', 1, 3);


INSERT INTO task_changes (task_id, field_name, previous_value, new_value, changed_by, changed_at) VALUES
(1, 'title', '"Old Title"', '"New Title"', 1, NOW()),
(2, 'status', '"To Do"', '"In Progress"', 2, NOW());


INSERT INTO product_teams (product_id, team_id) VALUES
(1, 1),
(2, 2);


INSERT INTO team_meeting_user (team_meeting_id, user_id) VALUES
(1, 1),
(1, 2),
(2, 3);


UPDATE comment SET task_id = 1 WHERE id = 1;
UPDATE comment SET task_id = 2 WHERE id = 2;


UPDATE comment SET article_id = 1 WHERE id = 1;
UPDATE comment SET article_id = 2 WHERE id = 2;


UPDATE sprint SET planning_meeting = 1, review_meeting = 2 WHERE id = 1;
UPDATE sprint SET retro_meeting = 1 WHERE id = 2;

