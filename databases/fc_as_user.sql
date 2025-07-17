USE assign;

DELIMITER $$

DROP FUNCTION IF EXISTS assign.fc_as_user$$
 
CREATE FUNCTION assign.fc_as_user
  ( pi_user_uid      VARCHAR(64)
  )
RETURNS INT
BEGIN

  DECLARE v_user_id    INT(32) DEFAULT 0;
    
  SELECT user_id
  INTO v_user_id
  FROM securitydb.sc_user
  WHERE user_uid = pi_user_uid;

  RETURN v_user_id;
  
END$$

DELIMITER ;