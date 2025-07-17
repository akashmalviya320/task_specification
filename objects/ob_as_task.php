<?php

include_once '../dist/utils/ut_gs_connect.php';  

class Task{
 
  //local variables 
  private $conn;

  //class property variables
  public $task_id = '';
  public $title = '';
  public $description = '';
  public $status = '';
  public $member_id = '';
  public $oper = 'X'; 
  public $user_uid = '';
  
  //create PDO instance for a database connection 
  public function __construct($db){
      $this->conn = $db;
  }

  //database routine handler for query operation (read/write)
  function db_oper(){
	
	error_log($this->task_id. " ".$this->oper);
    //calling database routine (stored procedure/function)
    $query = "CALL assign.pr_as_task
                ( :pi_task_id
				, :pi_title
				, :pi_description
				, :pi_status
				, :pi_member_id
				, :pi_oper
				, :pi_user_uid
                )";

    //prepare for exeuction of database routine
    $stmt = $this->conn->prepare( $query );

    //bind input/output parameters for database routine
    $stmt->bindParam(':pi_task_id', $this->task_id, PDO::PARAM_INT, 32);
    $stmt->bindParam(':pi_title', $this->title, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_description', $this->description, PDO::PARAM_STR, 2200);
    $stmt->bindParam(':pi_status', $this->status, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_member_id', $this->member_id, PDO::PARAM_STR, 64);
    $stmt->bindParam(':pi_oper', $this->oper, PDO::PARAM_STR, 1);
    $stmt->bindParam(':pi_user_uid', $this->user_uid, PDO::PARAM_STR, 64);
    
    //execute database routine
    $stmt->execute();

    //return execution status (true/false) to caller 
    return $stmt;

  }

}  