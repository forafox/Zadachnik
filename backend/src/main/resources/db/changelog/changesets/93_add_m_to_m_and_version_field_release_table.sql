ALTER TABLE product_release
    ADD COLUMN version TEXT;

CREATE TABLE releases_tasks
(
    release_id INTEGER REFERENCES product_release (id) ON DELETE CASCADE,
    task_id    INTEGER REFERENCES task (id) ON DELETE CASCADE,
    PRIMARY KEY (release_id, task_id)
);
