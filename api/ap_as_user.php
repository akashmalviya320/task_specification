<?php

//application initialization files inclusion
include_once "../dist/utils/ut_gs_config_msg.php";
include_once '../objects/ob_as_user.php';

//initialize class object
$user = new User($db);

//read parameter value from url
$user_uid = isset($_GET['user_uid']) ? $_GET['user_uid'] : 'X';
$id = isset($_GET['id']) ? strtoupper($_GET['id']) : '0';
$oper = isset($_GET['oper']) ? strtoupper($_GET['oper']) : 'X';

if($oper=='S') {	

  //set public class variables
  $user->user_uid = $user_uid;
  $user->member_id = $id;
  $user->oper = $oper;

  //call database routine
  $stmt = $user->db_oper();
  //total number of records returing by query 
  $num = $stmt->rowCount();  

  //if query has record set, read and store into php array to read by jquery.
  $user_arr=array();
  $user_arr['records']=array();
  if($num>0){
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
      // extract row
      extract($row);
      $user_item=array(
          'first_name' => (empty($first_name) ? '' : sentenceCase($first_name)),
          'middle_name' =>(empty($middle_name) ? '' : sentenceCase($middle_name)),
          'last_name' => (empty($last_name) ? '' : sentenceCase($last_name)),
          'user_name' => (empty($user_name) ? '' : sentenceCase($user_name)),
          'member_id' => (empty($member_id) ? '' : strtoupper($member_id)), 
          'role_code' => (empty($role_code) ? '' : strtoupper($role_code)), 
          'user_email' => (empty($user_email) ? '' : strtolower($user_email)), 
        );

		$user_item = array_map(function($value) {
			return mb_convert_encoding(is_null($value) ? '' : $value, 'UTF-8', 'auto');
		}, $user_item);

		array_push($user_arr['records'], $user_item);
    }
    //closing records fetching query  
    $stmt->closeCursor();
  }
  //Return status message to caller
  message_read($num, $user_arr);  
}
