USE securitydb;

DROP TABLE IF EXISTS securitydb.sc_role;
CREATE TABLE IF NOT EXISTS securitydb.sc_role 
  ( role_id            INT(32)          NOT NULL AUTO_INCREMENT
  , role_name          VARCHAR(64)
  , role_code          VARCHAR(64)
  , active             CHAR(1)    		NOT NULL DEFAULT 'Y'  
  , created_on         TIMESTAMP  		NOT NULL DEFAULT CURRENT_TIMESTAMP
  , updated_on         TIMESTAMP  		NOT NULL DEFAULT CURRENT_TIMESTAMP  
  , PRIMARY KEY (role_id)
  ) 
ENGINE=InnoDB;

CREATE INDEX sc_role_idx1 ON securitydb.sc_role(role_code);


INSERT INTO securitydb.sc_role (
    role_name,
    role_code
)
VALUES 
    ('ADMIN', 'ADM'),
    ('MEMBER', 'MEM');
