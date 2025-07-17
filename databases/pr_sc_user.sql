USE securitydb;

DELIMITER $$
DROP PROCEDURE IF EXISTS securitydb.pr_sc_user$$

CREATE PROCEDURE securitydb.pr_sc_user
  ( pi_member_id     VARCHAR(64)
  , pi_first_name    VARCHAR(64)
  , pi_middle_name   VARCHAR(64)
  , pi_last_name     VARCHAR(64)
  , pi_role		     VARCHAR(64)
  , pi_login_email   VARCHAR(64)
  , pi_login_pwd     VARCHAR(64)
  , pi_oper     	 CHAR(1)
  , pi_user_uid       VARCHAR(64)
)
BEGIN

	DECLARE v_user_id INT;
	DECLARE v_role_id INT;
    DECLARE v_created_on DATETIME;
	
	SELECT role_id INTO v_role_id
		FROM securitydb.sc_role
		WHERE role_name = pi_role;

	IF pi_oper = 'C' THEN
		INSERT INTO securitydb.sc_user
				SET first_name = pi_first_name
				  , middle_name = pi_middle_name
				  , last_name = pi_last_name
				  , role_id = v_role_id
				  , login_email = pi_login_email
				  , login_pwd = '';
		
		SET v_user_id = LAST_INSERT_ID();

		SELECT created_on INTO v_created_on
		FROM securitydb.sc_user
		WHERE user_id = v_user_id;

		UPDATE securitydb.sc_user
		SET
			user_uid = MD5(CONCAT(pi_first_name, pi_middle_name, pi_last_name, v_created_on)),
			login_pwd = MD5(CONCAT(pi_login_pwd, v_created_on)),
			member_id = CONCAT('TSM',v_user_id)
		WHERE user_id = v_user_id;   
		
	ELSEIF pi_oper = 'U' THEN 
			SET v_user_id = assign.fc_as_user(pi_user_uid);
			UPDATE securitydb.sc_user
			SET first_name = pi_first_name
			  , middle_name = pi_middle_name
			  , last_name = pi_last_name
			  , role_id     = v_role_id
			  , login_email = pi_login_email
			WHERE member_id = pi_member_id;
	END IF ;
	
END$$

DELIMITER ;
