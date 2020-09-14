DROP DATABASE IF EXISTS dc_adopt_db;

CREATE DATABASE dc_adopt_db;

CREATE TABLE pet_info (
   id INTEGER PRIMARY KEY,
   name VARCHAR(30) NOT NULL,
   age INTEGER NOT NULL,
   info VARCHAR(300) NOT NULL,
   breed VARCHAR(50) NOT NULL,
   health_conditions VARCHAR(50),
   sex VARCHAR(10) NOT NULL,
   neutered BOOLEAN NOT NULL,
   house_trained BOOLEAN NOT NULL,
   adoption_fee INTEGER NOT NULL
);