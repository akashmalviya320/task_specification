<?php

include_once '../dist/utils/ut_gs_config_msg.php';
include_once '../objects/ob_gs_login.php';

//initialize class object
$login = new Login($db);

//read json data posted by ajax call
$data = json_decode(file_get_contents("php://input"));

if($data->oper=='L') {

	if (isset($data->login_email) && !isValidEmail($data->login_email)) {
		http_response_code(400);
		echo json_encode(['error' => 'Invalid email format']);
		exit;
	}

	//set public class variables 
	$login->login_email = $data->login_email;
	$login->login_pwd = $data->login_pwd;
	$login->oper = strtoupper($data->oper);
  //call database routine
  $stmt = $login->db_oper();
  //total number of records returing by query 
  $num = $stmt->rowCount();

  //if query has record set, read and store into php array to read by jquery.
  if($num>0){

	$login_item=array();
	while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
	  extract($row);
	  $login_item=array(
		  'logged_in' => 'Y',
		  'user_uid' => $user_uid,
		  'user_email' => $user_email,
          'first_name' => (empty($first_name) ? '' : sentenceCase($first_name)),
          'middle_name' =>(empty($middle_name) ? '' : sentenceCase($middle_name)),
          'last_name' => (empty($last_name) ? '' : sentenceCase($last_name)),
          'user_name' => (empty($user_name) ? '' : sentenceCase($user_name)),
		  'role_code' => (empty($role_code) ? '' : strtoupper($role_code)),
		  'status' => $active,
		  'last_login' => $last_login,
		);      
	}
	$stmt->closeCursor();
	
	$login_item = array_map(function($value) {
		return is_null($value) ? null : mb_convert_encoding($value, 'UTF-8', 'UTF-8');
	}, $login_item);
  
	//set response code - 201 Success
	http_response_code(201);
	echo json_encode($login_item);
  
  }
}
elseif($data->oper=='C' || $data->oper=='U'){

	if (isset($data->login_email) && !isValidEmail($data->login_email)) {
		http_response_code(400);
		echo json_encode(['error' => 'Invalid email format']);
		exit;
	}
	//set public class variables 
	$login->member_id = strtoupper($data->id);
	$login->fullname = strtoupper($data->fullname);
	$login->role = strtoupper($data->role);
	$login->login_email = $data->login_email;
	$login->login_pwd = $data->login_pwd;
	$login->oper = strtoupper($data->oper);
	$login->user_uid = $data->user_uid;

	$stmt = $login->db_oper(); 
    http_response_code(201);
    echo json_encode(["oper" => $data->oper]);
}
elseif($data->oper=='D'){

	$login->member_id = strtoupper($data->id);
	$login->oper = strtoupper($data->oper);
	$login->user_uid = $data->user_uid;

	$stmt = $login->db_oper(); 
    http_response_code(201);
    echo json_encode(["oper" => $data->oper]);
}

?>