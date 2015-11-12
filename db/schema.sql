-- A master schema definition file for botto
-- This should contain all database table definition and can be used to
-- bring up a fresh instance of botto's database on a new install.

-- Definition for user quotes table, as referenced by `quotes` command
CREATE TABLE IF NOT EXISTS quotes (
  id SERIAL UNIQUE PRIMARY KEY,
  nick VARCHAR(55) NOT NULL,
  logged_by VARCHAR(55) NOT NULL,
  chan VARCHAR(55) NOT NULL,
  message TEXT NOT NULL,
  date_spoken DATE NOT NULL
);

-- Definition for SHOUTQUOTES table, as referenced by `shout` observer
CREATE TABLE IF NOT EXISTS shouts (
  id SERIAL UNIQUE PRIMARY KEY,
  nick VARCHAR(55) NOT NULL,
  chan VARCHAR(55) NOT NULL,
  message TEXT UNIQUE NOT NULL,
  date_spoken DATE NOT NULL
);

-- Definition for replies table, as referenced by `replies` observer
CREATE TABLE IF NOT EXISTS replies (
  id SERIAL UNIQUE PRIMARY KEY,
  added_by VARCHAR(55) NOT NULL,
  trigger TEXT NOT NULL,
  reply TEXT NOT NULL,
  enabled BOOLEAN DEFAULT TRUE,
  date_added DATE NOT NULL
);

-- Definition for ingored_users table
CREATE TABLE IF NOT EXISTS ignored_users (
  id SERIAL UNIQUE PRIMARY KEY,
  nick VARCHAR(55) NOT NULL,
  banned_by VARCHAR(55) NOT NULL,
  date_added DATE NOT NULL
);
