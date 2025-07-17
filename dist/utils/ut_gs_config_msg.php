<?php
//initialize session
if (session_status() === PHP_SESSION_NONE) 
  session_start();
//application setup  
$host = $_SERVER['HTTP_HOST'];

if ($host == "localhost") {
    $home_url = 'http://localhost/assign1/';
} else {
   $home_url = 'http://localhost/assign1/';
}

//config variables
$app_name = 'assign1';
$app_url = $home_url.'main/ht_gs_blank.php';
$upload_dir='/dist/upload/';
//default maximum value for dropdown pagination 
$total_rows=100000000000; 
// page given in URL parameter, default page is one
$page = isset($_GET['page']) ? $_GET['page'] : 1;
// set number of records per page
$records_per_page = 10;
// calculate for the query LIMIT clause
$from_record_num = ($records_per_page * $page) - $records_per_page;

//global variables
define('BASE_URL', $home_url);
//code Expire Time
define('CODE_EXPIRE_TIME', 10);

//generic functions
function sentenceCase($text) {
    if (is_null($text) || $text === '') {
        return ''; 
    } 
    return ucwords(strtolower($text));
}


function dateFormat($date, $format) {
  return date_format(date_create($date), $format);
}
function codeGenerate($length) {
  $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ12345689';
  $my_string = '';
  for ($i = 0; $i < $length; $i++) {
    $pos = random_int(0, strlen($chars) -1);
    $my_string .= substr($chars, $pos, 1);
  }
  return $my_string;
}

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function generate_password($length = 8){
  $chars =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.
            '0123456789!@#$%^&*';

  $str = '';
  $max = strlen($chars) - 1;

  for ($i=0; $i < $length; $i++)
    $str .= $chars[random_int(0, $max)];

  return $str;
}

function calculateAge($dob) {
    $dob = new DateTime($dob);
    $today = new DateTime();
    $age = $today->diff($dob)->y;  // Get the difference in years (age)
    return $age;
}

//Generic message handler for database read
function message_read($num, $record_arr) {

  if($num>0){
    //set response code - 200 OK
    http_response_code(200);
    //show results in json format
    echo json_encode($record_arr);  
  }
  //if query is not returning any records, return message to api caller.
  else {
    // return empty set to work data.length handler
    echo json_encode($record_arr);
  }
}  

//Generic message handler for database write
function message_write($stmt, $oper, $data=array()) {
  //check: operation identifier exists in json input
  if(isset($oper)){
    //call database routine to create/update records
    if($stmt){
      // set response code - 201 created
      http_response_code(201);
      //return response for opeation successful 
      echo json_encode(array("data"=> $data, "message" => "Response created successfully."));
    }
    else{
      // set response code - 503 service unavailable
      http_response_code(503);      
      //return response for create/update record failure
      echo json_encode(array("message" => "Unable to create response."));      
      //log error message to php error log file  
      error_log('api error : create operation failed.');
    }
  }
  //if json data is insufficient to complete database routine
  else{
    // set response code - 400 bad request
    http_response_code(400);
    //if json data is insufficient to complete database routine
    echo json_encode(array("message" => "Unable to create response. Data is incomplete."));  
    //log error message to php error log file  
    error_log('api error : create operation failed due to insufficient data.');
  }     
}