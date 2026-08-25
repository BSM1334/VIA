CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- sample admin user (password should be hashed by your seed script in production)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT,
    created_at TIMESTAMP DEFAULT now()
);


CREATE TABLE IF NOT EXISTS accidents (
    id SERIAL PRIMARY KEY,
    reporter_id INTEGER REFERENCES users(id),
    location JSONB,
    description TEXT,
    images JSONB,
    status TEXT DEFAULT 'reported',
    estimated_cost NUMERIC,
    created_at TIMESTAMP DEFAULT now()
);