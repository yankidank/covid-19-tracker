CREATE DATABASE covid19;
USE covid19;

CREATE TABLE stats
(
	id int NOT NULL AUTO_INCREMENT,
    city VARCHAR(100) NULL,
    province VARCHAR(500) NULL,
    country VARCHAR(100) NULL,
    confirmed INTEGER default 0,
    deaths INTEGER default 0,
    recovery INTEGER default 0,
    last_update datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    primary key(id)
    );