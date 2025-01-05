DROP TABLE IF EXISTS product_teams;

CREATE TABLE product_teams
(
    id         SERIAL PRIMARY KEY,                                                            -- Уникальный идентификатор с автоинкрементом
    product_id INTEGER NOT NULL,                                                              -- Внешний ключ на продукт
    team_id    INTEGER NOT NULL,                                                              -- Внешний ключ на команду
    status     TEXT NOT NULL,                                                                          -- Статус принятия заявки
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product (id) ON DELETE CASCADE, -- Внешний ключ для продукта
    CONSTRAINT fk_team FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE           -- Внешний ключ для команды
);