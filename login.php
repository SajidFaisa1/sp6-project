<?php
include 'connection.php';

$email = $_POST['email'];
$password = $_POST['password'];

// Query to check if user exists
$query = "SELECT * FROM registration WHERE email = ? AND password = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", $email, $password);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    echo "Login successful!";
} else {
    echo "Invalid email or password.";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
