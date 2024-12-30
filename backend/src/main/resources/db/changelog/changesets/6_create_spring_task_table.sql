CREATE TABLE sprint_tasks
(
    sprint_id INTEGER REFERENCES sprint (id) ON DELETE CASCADE,
    task_id   INTEGER REFERENCES task (id) ON DELETE CASCADE,
    PRIMARY KEY (sprint_id, task_id)
);
