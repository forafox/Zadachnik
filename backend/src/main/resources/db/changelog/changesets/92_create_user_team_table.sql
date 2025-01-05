CREATE TABLE user_team
(
    id      SERIAL PRIMARY KEY,                                                       -- Уникальный идентификатор с автоинкрементом
    user_id INTEGER NOT NULL,                                                         -- Внешний ключ на пользователя
    team_id INTEGER NOT NULL,                                                         -- Внешний ключ на команду
    status  TEXT    NOT NULL,                                                         -- Статус принятия заявки
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE, -- Внешний ключ для пользователя
    CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE   -- Внешний ключ для команды
);