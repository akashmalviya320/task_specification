USE assign;

DROP TABLE IF EXISTS assign.as_task;
CREATE TABLE IF NOT EXISTS assign.as_task 
  ( task_id           	 INT(32)        NOT NULL AUTO_INCREMENT
  , title          	 	 VARCHAR(64)
  , description        	 VARCHAR(2200)
  , assigned_to        	 VARCHAR(64)
  , status			 	 VARCHAR(64)
  , status_code          CHAR(3) 
  , active             	 CHAR(1)    	NOT NULL DEFAULT 'Y'  
  , created_on      	 TIMESTAMP 		NOT NULL DEFAULT CURRENT_TIMESTAMP
  , updated_on         	 TIMESTAMP  	NOT NULL DEFAULT CURRENT_TIMESTAMP  
  , PRIMARY KEY (task_id)
  ) 
ENGINE=InnoDB;

CREATE INDEX as_task_idx1 ON assign.as_task(title);
CREATE INDEX as_task_idx2 ON assign.as_task(assigned_to);

INSERT INTO assign.as_task 
(title, description, assigned_to, status, status_code)
VALUES
('Design Homepage', 
 'Create the homepage layout with responsive design using Bootstrap.', 
 'TSM1', 
 'Pending', 
 'PEN');

INSERT INTO assign.as_task 
(title, description, assigned_to, status, status_code)
VALUES
('Fix Login Bug', 
 'Resolve the issue where users are unable to log in with valid credentials.', 
 'TSM2', 
 'In Progress', 
 'IPG');
