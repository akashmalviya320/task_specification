<?php
  //application initialization files inclusion
  include_once "ut_gs_config_msg.php";

  if(isset($_SESSION["g_token"])) {
    $g_token = isset($_GET['t']) ? $_GET['t'] : 0;
    if($g_token !== $_SESSION["g_token"]) 
      die("Invalid request.");
  }  
  else 
    die("Invalid request.");
  

?>
  




 