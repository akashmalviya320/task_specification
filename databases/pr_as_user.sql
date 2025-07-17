USE assign;

DELIMITER $$
DROP PROCEDURE IF EXISTS assign.pr_as_user$$

CREATE PROCEDURE assign.pr_as_user
  ( pi_oper     	 	CHAR(1)
  , pi_member_id      	VARCHAR(64)
  , pi_user_uid       	VARCHAR(64)
)
BEGIN

	DECLARE v_user_id INT;

	IF pi_oper = 'S' THEN 
		SELECT su.first_name
			 , su.middle_name
			 , su.last_name
			 , su.user_name
			 , su.member_id
			 , su.role_code
			 , su.user_email
		FROM securitydb.vw_sc_user su
		WHERE su.member_id = IF(pi_member_id = '0', su.member_id, pi_member_id);
	END IF ;
	
END$$

DELIMITER ;
