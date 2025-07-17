<?php

include_once '../dist/utils/ut_gs_connect.php';  
  
class Login{
 
  //local variables 
  private $conn;

  //class property variables
  public $member_id='';
  public $fullname='';
  public $role='';
  public $login_email='';
  public $login_pwd='';
  public $oper='X';
  public $user_uid='X';

  //create PDO instance for a database connection 
  public function __construct($db){
      $this->conn = $db;
  }

  //database routine handler for query operation
  function db_oper(){
	  
	error_log("operation ".$this->oper." \n member_id ".$this->member_id);
    //calling database routine (stored procedure/function)
    $query = "CALL assign.pr_gs_login
                ( :pi_member_id
				, :pi_fullname
                , :pi_role
                , :pi_login_email
                , :pi_login_pwd
                , :pi_oper
                , :pi_user_uid
                );";

    //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    $stmt->bindParam(':pi_member_id', $this->member_id, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_fullname', $this->fullname, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_role', $this->role, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_login_email', $this->login_email, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_login_pwd', $this->login_pwd, PDO::PARAM_STR, 64);    
    $stmt->bindParam(':pi_oper', $this->oper, PDO::PARAM_STR, 1);
    $stmt->bindParam(':pi_user_uid', $this->user_uid, PDO::PARAM_STR, 64);

    //execute database routine
    $stmt->execute();

    //return execution status (true/false) to caller 
    return $stmt;
  }
}
?>