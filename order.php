<?php 
include 'connection.php';
$total = $_POST['total'];

 
$stmt2 = mysqli_prepare($conn, "INSERT INTO all_order(total) VALUES(?)");
mysqli_stmt_bind_param($stmt2, "d",$total);
if (mysqli_stmt_execute($stmt2)) {
    echo "Order added successfully <br>  ";
    echo "<a href='http://localhost/flower-shop-main/index.html'>Go back </a>";
} else {
    echo "Error in adding order: " . mysqli_error($conn);
}

mysqli_stmt_close($stmt2);

?>
