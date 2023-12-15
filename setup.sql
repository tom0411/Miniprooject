CREATE DATABASE miniproject;
\c miniproject;
\d+ item;
CREATE table item(
    id SERIAL primary key,
    tittle text
);