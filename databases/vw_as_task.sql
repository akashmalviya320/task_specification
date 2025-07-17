USE assign;

CREATE OR REPLACE VIEW assign.vw_as_task AS
SELECT 
    ts.task_id,
    ts.title,
    ts.description,
	ts.assigned_to AS member_id,
    su.user_name AS assigned_to,  
    su.user_email AS assignee_email,  
    ts.status,
    ts.status_code,
    ts.active,
    ts.created_on,
    ts.updated_on
FROM assign.as_task ts
LEFT JOIN securitydb.vw_sc_user su 
ON ts.assigned_to = su.member_id
WHERE ts.active = 'Y'
ORDER BY ts.updated_on DESC;
