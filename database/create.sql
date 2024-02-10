DROP DATABASE IF EXISTS projet_cms;
CREATE DATABASE projet_cms;;
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
   website_name VARCHAR(30)  NOT NULL,
   user_id INT NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(website_name),
   FOREIGN KEY(user_id) REFERENCES wuser(id)
);

CREATE TABLE articles(
   id INT AUTO_INCREMENT,
   contenu JSON NOT NULL,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES website(id)
);

CREATE TABLE Feedback(
   id INT AUTO_INCREMENT,
   contenu VARCHAR(50)  NOT NULL,
   user_name VARCHAR(60)  NOT NULL,
   id_1 INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_1) REFERENCES articles(id)
);
