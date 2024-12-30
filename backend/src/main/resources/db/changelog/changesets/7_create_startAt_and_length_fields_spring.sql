-- Добавление колонки startAt в таблицу sprint
ALTER TABLE sprint
    ADD COLUMN start_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
-- Добавление колонки length в таблицу sprint
ALTER TABLE sprint
    ADD COLUMN length INT NOT NULL;
