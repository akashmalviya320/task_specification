USE assign;
DELIMITER $$

DROP PROCEDURE IF EXISTS assign.pr_gs_login$$

CREATE PROCEDURE assign.pr_gs_login
  ( pi_member_id      VARCHAR(64)
  , pi_fullname       VARCHAR(64)
  , pi_role		      VARCHAR(64)
  , pi_login_email    VARCHAR(64)
  , pi_login_pwd      VARCHAR(64)
  , pi_oper           CHAR(1)
  , pi_user_uid       VARCHAR(64)
)
BEGIN
    DECLARE v_fname 	VARCHAR(32);
    DECLARE v_mname  	VARCHAR(32);
    DECLARE v_lname  	VARCHAR(32);
	DECLARE name_parts 	INT;
	DECLARE v_user_id   INT(32);

    IF pi_oper = 'C' || pi_oper = 'U' THEN
		SET name_parts = LENGTH(pi_fullname) - LENGTH(REPLACE(pi_fullname, ' ', '')) + 1;

		IF name_parts = 2 THEN
			SET v_fname = SUBSTRING_INDEX(pi_fullname, ' ', 1);
			SET v_mname = '';
			SET v_lname = SUBSTRING_INDEX(pi_fullname, ' ', -1);

		ELSEIF name_parts >= 3 THEN
			SET v_fname = SUBSTRING_INDEX(pi_fullname, ' ', 1);
			SET v_lname = SUBSTRING_INDEX(pi_fullname, ' ', -1);
			SET v_mname = SUBSTRING_INDEX(SUBSTRING_INDEX(pi_fullname, ' ', 2), ' ', -1);
			
		ELSE
			SET v_fname = pi_fullname;
			SET v_mname = '';
			SET v_lname = '';
		END IF;

        CALL securitydb.pr_sc_user
					( pi_member_id
					, v_fname
					, v_mname
					, v_lname
					, pi_role
					, pi_login_email
					, pi_login_pwd
					, pi_oper
					, pi_user_uid
					);
       
    ELSEIF pi_oper = 'L' THEN

		SELECT user_id
		INTO v_user_id
		FROM securitydb.sc_user
		WHERE login_email = pi_login_email
		AND login_pwd = MD5(CONCAT(pi_login_pwd, created_on))
		AND active = 'Y';
	
		SELECT user_uid
         , user_email
         , first_name
         , middle_name
         , last_name
         , user_name
		 , role_code
         , active 
         , last_login
		FROM securitydb.vw_sc_user
		WHERE user_id = v_user_id;
		
	ELSEIF pi_oper = 'D'	THEN
		UPDATE securitydb.sc_user
		SET active = 'N'
		WHERE member_id = pi_member_id;

	END IF;
END$$

DELIMITER ;
