-- SQLBook: Code
DROP DATABASE IF EXISTS projet_cms;

CREATE DATABASE projet_cms;

USE projet_cms;
CREATE TABLE wuser(
   id INT AUTO_INCREMENT,
   username VARCHAR(50)  NOT NULL,
   userfname VARCHAR(50)  NOT NULL,
   email VARCHAR(80)  NOT NULL,
   password VARCHAR(80)  NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(email)
);

CREATE TABLE website(
   id INT AUTO_INCREMENT,
   site_config_file_path VARCHAR(255)  NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(user_id) REFERENCES wuser(id)
);
