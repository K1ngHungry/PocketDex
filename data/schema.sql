CREATE DATABASE IF NOT EXISTS pocketdex;

USE pocketdex;

CREATE TABLE IF NOT EXISTS sets (
    set_id VARCHAR(5) NOT NULL,
    name VARCHAR(50) NOT NULL,
    release_date VARCHAR(20),
    card_count INT NOT NULL,
    img_url TEXT,
    url TEXT NOT NULL,
    PRIMARY KEY (set_id)
);

DROP TABLE IF EXISTS cards;
CREATE TABLE IF NOT EXISTS cards (
    set_id VARCHAR(5) NOT NULL,
    set_number INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    img_url TEXT NOT NULL,
    artist VARCHAR(100),
    pack VARCHAR(50),
    rarity VARCHAR(20),
    /*pokemon only*/
    type VARCHAR(50),
    stage VARCHAR(50),
    evolution VARCHAR(100),
    hp INT,
    weakness VARCHAR(50),
    retreat VARCHAR(10),
    description TEXT,
    is_ex BOOLEAN,
    category VARCHAR(20), 
    /*trainer only*/
    effect TEXT,
    PRIMARY KEY (set_id, set_number),
    FOREIGN KEY (set_id) REFERENCES sets(set_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS attacks;
CREATE TABLE IF NOT EXISTS attacks (
    set_id VARCHAR(5) NOT NULL,
    set_number INT NOT NULL,
    attack_id INT,
    name VARCHAR (100),
    damage INT,
    operator VARCHAR(5),
    effect TEXT,
    PRIMARY KEY (set_id, set_number, attack_id),
    FOREIGN KEY (set_id, set_number) REFERENCES cards(set_id, set_number) ON DELETE CASCADE
);