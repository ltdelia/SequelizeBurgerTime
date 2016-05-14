create database burgers_db;
use burgers_db;

CREATE TABLE burgers(
  id int AUTO_INCREMENT NOT NULL,
  burger_name varchar(100),
  devoured boolean,
  date TIMESTAMP,
  PRIMARY KEY (id)
)