<?php
// Database configuration
$host = "localhost";
$userName = "root";
$password = ""; // Default for XAMPP
$database = "project";

// Create a connection
$conn = mysqli_connect($host, $userName, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>