<?php
include 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $username = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Prepare and execute the update query
    $stmt = $conn->prepare("UPDATE registration SET name=?, email=?, password=? WHERE id=?");
    $stmt->bind_param("sssi", $username, $email, $password, $id);

    if ($stmt->execute()) {
        echo "User updated successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
