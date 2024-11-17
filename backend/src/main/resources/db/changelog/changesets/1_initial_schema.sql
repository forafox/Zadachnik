CREATE TABLE "user"
(
    id        SERIAL PRIMARY KEY,
    username  TEXT UNIQUE NOT NULL,
    full_name TEXT,
    password  TEXT        NOT NULL
);

CREATE TABLE team
(
    id           SERIAL PRIMARY KEY,
    title        TEXT UNIQUE NOT NULL,
    scrum_master INTEGER REFERENCES "user" (id)
);

CREATE TABLE product
(
    id          SERIAL PRIMARY KEY,
    short_name  TEXT UNIQUE NOT NULL,
    title       TEXT,
    description TEXT,
    owner       INTEGER REFERENCES "user" (id)
);

CREATE TABLE sprint
(
    id               SERIAL PRIMARY KEY,
    team_id          INTEGER REFERENCES team (id),
    planning_meeting INTEGER REFERENCES team_meeting (id),
    review_meeting   INTEGER REFERENCES team_meeting (id),
    retro_meeting    INTEGER REFERENCES team_meeting (id)
);

CREATE TABLE comment
(
    id         SERIAL PRIMARY KEY,
    author     INTEGER REFERENCES "user" (id),
    content    TEXT,
    article_id INTEGER REFERENCES article (id),
    task_id    INTEGER REFERENCES task (id)
);

CREATE TABLE team_meeting
(
    id      SERIAL PRIMARY KEY,
    title   TEXT,
    agenda  TEXT,
    team_id INTEGER REFERENCES team (id)
);

CREATE TABLE article
(
    id      SERIAL PRIMARY KEY,
    content TEXT,
    author  INTEGER REFERENCES "user" (id)
);

CREATE TABLE product_release
(
    id         SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES product (id),
    sprint_id  INTEGER REFERENCES sprint (id),
    notes      INTEGER REFERENCES article (id)
);

CREATE TABLE release_changelog_entry
(
    release_id INTEGER REFERENCES product_release (id),
    task_id    INTEGER REFERENCES task (id),
    type       TEXT,
    comment    TEXT,
    PRIMARY KEY (release_id, task_id)
);

CREATE TABLE task
(
    id          SERIAL PRIMARY KEY,
    type        TEXT,
    title       TEXT,
    description TEXT,
    product_id  INTEGER REFERENCES product (id)
);

CREATE TABLE task_relation
(
    type   TEXT,
    parent INTEGER REFERENCES task (id),
    child  INTEGER REFERENCES task (id),
    PRIMARY KEY (parent, child)
);

CREATE TABLE task_changes
(
    task_id        INTEGER REFERENCES task (id),
    field_name     TEXT,
    previous_value JSON,
    new_value      JSON,
    changed_by     INTEGER REFERENCES "user" (id),
    changed_at     TIMESTAMPTZ,
    PRIMARY KEY (task_id, field_name, changed_at)
);

CREATE TABLE product_teams
(
    product_id INTEGER REFERENCES product (id),
    team_id    INTEGER REFERENCES team (id),
    PRIMARY KEY (product_id, team_id)
);

CREATE TABLE team_meeting_user
(
    team_meeting_id INTEGER REFERENCES team_meeting (id),
    user_id         INTEGER REFERENCES "user" (id),
    PRIMARY KEY (team_meeting_id, user_id)
);