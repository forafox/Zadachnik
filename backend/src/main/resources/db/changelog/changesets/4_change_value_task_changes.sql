ALTER TABLE task_changes
    ALTER COLUMN previous_value TYPE TEXT;

ALTER TABLE task_changes
    ALTER COLUMN new_value TYPE TEXT;
