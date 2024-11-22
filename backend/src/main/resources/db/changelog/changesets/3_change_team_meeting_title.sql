-- Step 1: Rename column "title" to "type"
ALTER TABLE team_meeting
    RENAME COLUMN title TO type;

-- Step 2: Change the column "type" to
ALTER TABLE team_meeting
    ALTER COLUMN type TYPE VARCHAR;

-- Step 3: Add a NOT NULL constraint to the "type" column
ALTER TABLE team_meeting
    ALTER COLUMN type SET NOT NULL;
