DROP DATABASE IF EXISTS covid19;
CREATE DATABASE covid19;
USE covid19;

CREATE TABLE stats
(
	id int NOT NULL AUTO_INCREMENT,
    FIPS INTEGER NULL,
    Admin2 VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    province VARCHAR(500) NULL,
    country VARCHAR(100) NULL,
    confirmed INTEGER default 0,
    deaths INTEGER default 0,
    recovery INTEGER default 0,
    last_update datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    latitude Decimal(18,15) NULL,
    longitude Decimal(18,15) NULL,
    active INTEGER NULL,
    combined_key VARCHAR(500) NULL,
    primary key(id)
);