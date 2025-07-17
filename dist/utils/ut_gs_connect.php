<?php
// config
// message
// connect

class AppDB{
  
  // specify your own database credentials
  private $host = "localhost";
  private $username = "app";
  private $password = "app";
  
  public $db_name = 'assign';
  public $conn;

  // get the database connection
  public function getConnection(){

    $this->conn = null;

    try{
        $pdo = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        $this->conn = $pdo;
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
    }catch(PDOException $exception){
        error_log("MySQL error: " . $exception->getMessage());
    }

    return $this->conn;

  }
}
// instantiate database connection 
$appdb = new AppDB();
//$appdb->db_name = 'appdb';
$db = $appdb->getConnection();

?>
