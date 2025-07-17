
USE securitydb;

CREATE OR REPLACE VIEW securitydb.vw_sc_user AS
SELECT se.user_id,
       se.user_uid,
       se.first_name,
       se.middle_name,
       se.last_name,
	   se.member_id,
       CONCAT(
           IFNULL(se.first_name, ''),
           IFNULL(CONCAT(' ', se.middle_name), ''),
           IFNULL(CONCAT(' ', se.last_name), '')
       ) AS user_name,
       se.login_email AS user_email,
	   sr.role_code,
       se.active,
       se.last_login
FROM securitydb.sc_user se
LEFT JOIN securitydb.sc_role sr 
ON se.role_id = sr.role_id
WHERE se.active = 'Y'
ORDER BY user_name ASC;
