USE securitydb;

DROP TABLE IF EXISTS securitydb.sc_user;
CREATE TABLE IF NOT EXISTS securitydb.sc_user 
  ( user_id            INT(32)          NOT NULL AUTO_INCREMENT
  , user_uid           VARCHAR(64)
  , member_id          VARCHAR(64)
  , first_name         VARCHAR(64)
  , middle_name        VARCHAR(64)
  , last_name          VARCHAR(64)
  , role_id            INT(32) 
  , login_email        VARCHAR(64)
  , login_pwd          VARCHAR(64)
  , active             CHAR(1)    		NOT NULL DEFAULT 'Y'  
  , last_login         DATETIME   		NULL DEFAULT NULL 
  , created_on         TIMESTAMP  		NOT NULL DEFAULT CURRENT_TIMESTAMP
  , updated_on         TIMESTAMP  		NOT NULL DEFAULT CURRENT_TIMESTAMP  
  , PRIMARY KEY (user_id)
  ) 
ENGINE=InnoDB;

CREATE INDEX sc_user_idx1 ON securitydb.sc_user(user_uid);
CREATE UNIQUE INDEX email ON securitydb.sc_user(login_email);

