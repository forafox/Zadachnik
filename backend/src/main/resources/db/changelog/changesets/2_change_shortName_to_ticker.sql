-- Переименовываем колонку short_name в ticker
ALTER TABLE product
    RENAME COLUMN short_name TO ticker;

-- Делаем колонку title обязательной (NOT NULL)
ALTER TABLE product
    ALTER COLUMN title SET NOT NULL;