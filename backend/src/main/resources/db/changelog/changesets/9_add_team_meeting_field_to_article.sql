ALTER TABLE article
    ADD COLUMN team_meeting_id INTEGER REFERENCES team_meeting (id) ON DELETE CASCADE;
