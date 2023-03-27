-- datetime format : YYYY-MM-DD HH:MI:SS
--@block
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    user_name VARCHAR(255) UNIQUE NOT NULL,
    date_created DATETIME
);
--@block
CREATE TABLE accounts (
    id int PRIMARY KEY AUTO_INCREMENT,
    account_type INT,
    user_id int
);
--@block
CREATE TABLE savings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    balance INT,
    apr DECIMAL(8, 2),
    account_type INT,
    date_opened DATETIME,
    user_id INT
);
--@block
CREATE TABLE checkings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    balance INT,
    account_type INT,
    date_opened DATETIME,
    user_id INT
);
--@block
CREATE TABLE credit (
    id INT PRIMARY KEY AUTO_INCREMENT,
    credit_limit INT,
    balance INT,
    account_type INT,
    date_opened DATETIME,
    user_id INT
);
--@block
SHOW TABLES;
--@block    
INSERT INTO users (
        fname,
        lname,
        email,
        password,
        user_name,
        date_created
    )
VALUES (
        "John",
        "Smith",
        "js@email.com",
        "$2b$10$sKfstzktGCR.zmEL0Q8eI.o6Mujw0y7vSCb/pjs5McOVitWca/VGq",
        "johnsmithy",
        "2023-03-15 13:26:00"
    ),
    (
        "Ricky",
        "Bobby",
        "rickbob@email.com",
        "$2b$10$frYFsGm7hgJAxGzka7u7cusaSTkUhRwMHYU8XZ7UO4W7FCbFiw/W.",
        "first",
        "2023-03-15 08:10:00"
    ),
    (
        "Frank",
        "Tank",
        "frankthetank@email.com",
        "$2b$10$sAXIe4G24Dy1BCXiDPkqpeIM1hwVFunEVJwA2uJjmZrtIzjKngrI2",
        "tankinator",
        "2023-03-15 16:36:00"
    ),
    (
        "Jacky",
        "Moon",
        "jmoon@email.com",
        "$2b$10$h1KbJvJTDq48s6V4aTZ83eVEDuBcXLyGs0ldiAs1ueiPlI0ESCMdW",
        "lovemesexy",
        "2023-03-20 23:44:00"
    ),
    (
        "Ron",
        "Burgundy",
        "channel4@email.com",
        "$2b$10$xTTOEHl18V.WFUvJSZvTCupr/mM/mc7sn369fzEGg44r/5rTxyUAS",
        "bestAnchor",
        "2021-03-15 07:00:00"
    ),
    (
        "Allen",
        "Gamble",
        "ag@email.com",
        "$2b$10$RkMDIJV9bpSWqm6Y1VF5u.LVs3vB9/zcaQUObydfM7TZ9tAYCIYie",
        "gator",
        "2023-03-15 19:16:00"
    );
--@block
SELECT *
FROM users;
--@block
INSERT INTO accounts(account_type, user_id)
VALUES (0, 1),
    (0, 2),
    (0, 3),
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 2),
    (2, 3);
--@block 
SELECT *
from accounts;
--@block
INSERT INTO savings(balance, apr, account_type, date_opened, user_id)
VALUES (
        1000,
        1.5,
        0,
        "2023-05-10 10:00:00",
        1
    ),
    (
        300,
        5.0,
        0,
        "2023-05-10 10:00:00",
        2
    ),
    (
        630,
        1.5,
        0,
        "2023-05-10 10:00:00",
        3
    );
--@block 
SELECT *
from savings;
--@block
INSERT INTO checkings(balance, account_type, date_opened, user_id)
VALUES (500, 1, "2023-05-10 10:00:00", 1),
    (830, 1, "2023-05-10 10:00:00", 2),
    (620, 1, "2023-05-10 10:00:00", 3);
--@block 
SELECT *
from checkings;
--@block
INSERT INTO credit (
        credit_limit,
        balance,
        account_type,
        date_opened,
        user_id
    )
VALUES (7000, 300, 2, "2023-05-10 10:00:00", 1),
    (200, 100, 2, "2023-05-10 10:00:00", 2),
    (50, 0, 2, "2023-05-10 10:00:00", 3);
--@block 
SELECT *
from credit;
--@block: list of accounts held by each user
SELECT users.id,
    fname,
    lname,
    accounts.account_type
FROM users
    JOIN accounts on users.id = accounts.user_id;
--@block: users with a checkings account
SELECT fname,
    lname,
    balance,
    date_opened
FROM users
    JOIN checkings ON users.id = checkings.user_id;
--@block: users with a savings account
SELECT fname,
    lname,
    balance,
    apr,
    date_opened
FROM users
    JOIN savings ON users.id = savings.user_id;
--@block: users with a credit account
SELECT fname,
    lname,
    balance,
    credit_limit,
    date_opened
FROM users
    JOIN credit ON users.id = credit.user_id;