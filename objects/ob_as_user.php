<?php

include_once '../dist/utils/ut_gs_connect.php';  

class User{
 
  //local variables 
  private $conn;

  //class property variables
  public $user_uid = '';
  public $member_id = ''; 
  public $oper = 'X'; 
  
  //create PDO instance for a database connection 
  public function __construct($db){
      $this->conn = $db;
  }

  //database routine handler for query operation (read/write)
  function db_oper(){

    //calling database routine (stored procedure/function)
    $query = "CALL assign.pr_as_user
                ( :pi_oper
				, :pi_member_id
				, :pi_user_uid
                )";

    //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    $stmt->bindParam(':pi_oper', $this->oper, PDO::PARAM_STR, 1);
    $stmt->bindParam(':pi_member_id', $this->member_id, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_user_uid', $this->user_uid, PDO::PARAM_STR, 64);
    
    //execute database routine
    $stmt->execute();

    //return execution status (true/false) to caller 
    return $stmt;

  }

}  