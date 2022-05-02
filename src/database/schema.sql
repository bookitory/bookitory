CREATE TABLE IF NOT EXISTS `member` (
    `email` VARCHAR(50) NOT NULL,
    `pwd` VARCHAR(255) NOT NULL,
    `profile` VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (email)
);

CREATE user 'bookitory'@'localhost' identified BY 'bookitory1!'; 