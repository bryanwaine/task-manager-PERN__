CREATE DATABASE taskmanager;

CREATE TABLE task (
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(225)
);
