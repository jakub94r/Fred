<?php
include "credentials.php";


header("Access-Control-Allow-Origin: *");


try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {    
    echo "Connection failed: " . $e->getMessage();
    }
    
    
$connect = mysqli_connect($servername, $username, $password, $database) or die('Database Not Connected. Please Fix the Issue! ' . mysqli_error());

?>