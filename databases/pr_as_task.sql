USE assign;

DELIMITER $$
DROP PROCEDURE IF EXISTS assign.pr_as_task$$

CREATE PROCEDURE assign.pr_as_task
  ( pi_task_id			INT(32)
  , pi_title			VARCHAR(64)
  , pi_description    	VARCHAR(2200)
  , pi_status    	 	VARCHAR(64)
  , pi_member_id   	 	VARCHAR(64)
  , pi_oper     	 	CHAR(1)
  , pi_user_uid       	VARCHAR(64)
)
BEGIN

	DECLARE v_user_id 		INT;
	DECLARE v_status_code 	VARCHAR(3);
	DECLARE v_role_code 	VARCHAR(3);
	DECLARE v_member_id 	VARCHAR(64);
	
	SET v_user_id = assign.fc_as_user(pi_user_uid);

	SELECT role_code, member_id
	INTO v_role_code, v_member_id
	FROM securitydb.vw_sc_user
	WHERE user_id = v_user_id
	LIMIT 1;
	
	IF pi_status = 'OPEN' THEN
		SET v_status_code = 'OPN';
	ELSEIF pi_status = 'IN PROGRESS' THEN
		SET v_status_code = 'IPG';
	ELSEIF pi_status = 'IN REVIEW' THEN
		SET v_status_code = 'IRV';
	ELSEIF pi_status = 'PENDING' THEN
		SET v_status_code = 'PEN';
	ELSEIF pi_status = 'COMPLETED' THEN
		SET v_status_code = 'CMP';
	ELSE
		SET v_status_code = 'UNK';
	END IF;

	IF pi_oper = 'S' THEN

	  IF v_role_code = 'ADM' THEN
	  
		SELECT su.task_id,
			   su.title,
			   su.description,
			   su.member_id,
			   su.assigned_to,
			   su.assignee_email,
			   su.status,
			   su.status_code,
			   su.created_on,
			   su.updated_on
		FROM assign.vw_as_task su
		WHERE su.task_id = IF(pi_task_id = 0, su.task_id, pi_task_id);

	  ELSEIF v_role_code = 'MEM' THEN

		SELECT su.task_id,
			   su.title,
			   su.description,
			   su.member_id,
			   su.assigned_to,
			   su.assignee_email,
			   su.status,
			   su.status_code,
			   su.created_on,
			   su.updated_on
		FROM assign.vw_as_task su
		WHERE su.task_id = IF(pi_task_id = 0, su.task_id, pi_task_id)
		AND su.member_id = v_member_id;

	  END IF;

	ELSEIF pi_oper = 'I' THEN
			
		INSERT INTO assign.as_task
		SET title = pi_title
		  , description = pi_description
		  , status = pi_status
		  , status_code = v_status_code
		  , assigned_to = pi_member_id;
		
	ELSEIF pi_oper = 'U'	THEN
	
		IF v_role_code = 'ADM'	THEN
			UPDATE assign.as_task
			SET title = pi_title
			  , description = pi_description
			  , status = pi_status
			  , status_code = v_status_code
			  , assigned_to = pi_member_id
			  , updated_on = NOW()
			WHERE task_id = pi_task_id;
			
		ELSEIF v_role_code = 'MEM'	 THEN
			UPDATE assign.as_task
			SET status = pi_status
			  , status_code = v_status_code
			  , updated_on = NOW()
			WHERE task_id = pi_task_id;
		END IF;
			
	ELSEIF pi_oper = 'D'	THEN
	
		UPDATE assign.as_task
		SET active = 'N'
		WHERE task_id = pi_task_id;
	END IF ;
	
END$$

DELIMITER ;
