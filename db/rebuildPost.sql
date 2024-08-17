-- Drop the existing table
DROP TABLE IF EXISTS Posts;

-- Create the new table with the desired schema
CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date_of_creation TIMESTAMP DEFAULT NOW(),  -- Use NOW() for default timestamp
    content TEXT NOT NULL,
    author_id INTEGER REFERENCES Users(id)
);

-- Insert Posts
INSERT INTO Posts (title, content, author_id)
VALUES 
    ('First Post Title', 'Content for the first post.', 1),
    ('Second Post Title', 'Content for the second post.', 2),
    ('Third Post Title', 'Content for the third post.', 3),
    ('Fourth Post Title', 'Content for the fourth post.', 1),
    ('Fifth Post Title', 'Content for the fifth post.', 2),
    ('Sixth Post Title', 'Content for the sixth post.', 3),
    ('Seventh Post Title', 'Content for the seventh post.', 1),
    ('Eighth Post Title', 'Content for the eighth post.', 2),
    ('Ninth Post Title', 'Content for the ninth post.', 3),
    ('Tenth Post Title', 'Content for the tenth post.', 1);