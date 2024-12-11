<?php
 include 'connection.php';

// Get form data
$name = $_POST['name']; 
$email = $_POST['email']; 
$password = $_POST['password']; 
$confirmPassword = $_POST['confirmPassword']; 

// Validate password confirmation
if ($password !== $confirmPassword) {
    die('Passwords do not match.');
}

// 1. Insert into registration table
$stmt1 = mysqli_prepare($conn, "INSERT INTO registration(name, email, password, confirmPassword) VALUES(?, ?, ?, ?)");
mysqli_stmt_bind_param($stmt1, "ssss", $name, $email, $password, $confirmPassword);


// Execute registration query and check for success
if (mysqli_stmt_execute($stmt1)) {
    echo "Registration Successful <br>";
    echo "<a href='http://localhost/flower-shop-main/index.html'>Go back </a>";
} 

mysqli_stmt_close($stmt1);
mysqli_close($conn);

?>
