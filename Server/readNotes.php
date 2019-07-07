<?php
include "db.php";

$stmt = $conn->query('SELECT * FROM Notes');

$query = "SELECT * FROM Notes";
$res = mysqli_query($connect, $query) or die("Query Not Executed " . mysql_error($connect));

$rows = array();
    while ($row = mysqli_fetch_array($res)) {

        $rows[] = $row;
    }

    echo json_encode($rows);

?>