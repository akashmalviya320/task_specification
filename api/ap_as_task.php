<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_config_msg.php";
include_once '../objects/ob_as_task.php';

//initialize class object
$task = new Task($db);

//read parameter value from url
$user_uid = isset($_GET['user_uid']) ? $_GET['user_uid'] : 'X';
$id = isset($_GET['id']) ? strtoupper($_GET['id']) : '0';
$oper = isset($_GET['oper']) ? strtoupper($_GET['oper']) : 'X';

//read json data posted by ajax call
$data = json_decode(file_get_contents("php://input"));

if($oper=='S') {	

  //set public class variables
  $task->user_uid = $user_uid;
  $task->task_id = $id;
  $task->oper = $oper;

  //call database routine
  $stmt = $task->db_oper();
  //total number of records returing by query 
  $num = $stmt->rowCount();  

  //if query has record set, read and store into php array to read by jquery.
  $task_arr=array();
  $task_arr['records']=array();
  if($num>0){
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      // extract row
      extract($row);
      $task_item=array(
          'id' => $task_id,
          'title' => $title,
          'description' =>$description,
          'member_id' => (empty($assigned_to) ? '' : strtoupper($assigned_to)),
          'assigned_to' => (empty($assigned_to) ? '' : sentenceCase($assigned_to)),
          'assignee_email' => (empty($assignee_email) ? '' : strtolower($assignee_email)),
          'status' => (empty($status) ? '' : sentenceCase($status)),
          'status_code' => (empty($status_code) ? '' : strtoupper($status_code)), 
          'created_on' => $created_on,
          'updated_on' => $updated_on,
        );

		$task_item = array_map(function($value) {
			return mb_convert_encoding(is_null($value) ? '' : $value, 'UTF-8', 'auto');
		}, $task_item);

		array_push($task_arr['records'], $task_item);
    }
    //closing records fetching query  
    $stmt->closeCursor();
  }
  //Return status message to caller
  message_read($num, $task_arr);  
}
elseif($data->oper=='I' || $data->oper=='U'){

	//set public class variables 
	$task->task_id = $data->id;
	$task->title = $data->title;
	$task->description = $data->description;
	$task->status = strtoupper($data->status);
	$task->member_id = strtoupper($data->member_id);
	$task->oper = strtoupper($data->oper);
	$task->user_uid = $data->user_uid;

	$stmt = $task->db_oper(); 
    http_response_code(201);
    echo json_encode(["oper" => $data->oper]);
}
elseif($data->oper=='D'){

	//set public class variables 
	$task->task_id = $data->id;
	$task->oper = strtoupper($data->oper);
	$task->user_uid = $data->user_uid;

	$stmt = $task->db_oper(); 
    http_response_code(201);
    echo json_encode(["oper" => $data->oper]);
}

