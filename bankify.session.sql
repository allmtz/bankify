--@block
    CREATE TABLE users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        fname VARCHAR(255),
        lname VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
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
        apr DECIMAL(8,2) ,
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


-- datetime format : YYYY-MM-DD HH:MI:SS

--@block    
    INSERT INTO users (fname, lname, email, password, date_created)
    VALUES (
        "John",
        "Smith",
        "js@email.com",
        "pass",
        "2023-03-15 13:26:00"
    ),(
        "Ricky",
        "Bobby",
        "rickbob@email.com",
        "gofast",
        "2023-03-15 08:10:00"
    ),(
        "Frank",
        "Tank",
        "frankthetank@email.com",
        "tanky",
        "2023-03-15 16:36:00"
    ),(
        "Jacky",
        "Moon",
        "jmoon@email.com",
        "kindapro",
        "2023-03-20 23:44:00"
    ),(
        "Ron",
        "Burgundy",
        "channel4@email.com",
        "sandiago",
        "2021-03-15 07:00:00"
    ),(
        "Allen",
        "Gamble",
        "ag@email.com",
        "gator",
        "2023-03-15 19:16:00"
    );

--@block
    SELECT * FROM users;

--@block
    INSERT INTO accounts(account_type, user_id) 
    VALUES (
        0,2
    ),(
        1,2
    ),(
        2,2
    ),(
        2,3
    ),(
        0,4
    ),(
        1,5
    ),(
        0,5
    ),(
        2,6
    ),(
        0,6
    ),(
        1,7
    );

--@block 
    SELECT *  from accounts;

--@block
    INSERT INTO savings(balance, apr, account_type, date_opened, user_id)
    VALUES (
        1000,
        1.5,
        0,
        "2023-05-10 10:00:00",
        5
    ),(
        300,
        5.0,
        0,
        "2023-05-10 10:00:00",
        7
    ),(
        630,
        1.5,
        0,
        "2023-05-10 10:00:00",
        9
    );

--@block 
    SELECT *  from savings;


--@block
    INSERT INTO checkings(balance, account_type, date_opened, user_id)
     VALUES 
        (500, 1, "2023-05-10 10:00:00", 2),
        (830, 1, "2023-05-10 10:00:00", 5),
        (620, 1, "2023-05-10 10:00:00", 7);

--@block 
    SELECT *  from checkings;


--@block
    INSERT INTO credit (credit_limit, balance, account_type, date_opened, user_id)
    VALUES
        (7000, 300, 2, "2023-05-10 10:00:00", 2 ),
        (200, 100, 2, "2023-05-10 10:00:00", 3 ),
        (50, 0, 2, "2023-05-10 10:00:00", 6 );

--@block 
    SELECT *  from credit;




        --QUERIES
--@block: list of accounts held by each user
    SELECT users.id, fname, lname, accounts.account_type
    FROM users
    JOIN accounts on users.id = accounts.user_id;

--@block: users with a checkings account
    SELECT fname, lname, balance, date_opened
    FROM users 
    JOIN checkings
    ON users.id = checkings.user_id;

--@block: users with a savings account
    SELECT fname, lname, balance, apr, date_opened
    FROM users 
    JOIN savings
    ON users.id = savings.user_id;

--@block: users with a credit account
    SELECT fname, lname, balance, credit_limit, date_opened
    FROM users 
    JOIN credit
    ON users.id = credit.user_id;