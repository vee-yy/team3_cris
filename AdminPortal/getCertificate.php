<?php
header('Content-Type: application/json');

// Include the main connection file to use the same connection settings
include '../connect.php';

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Helper to fetch certificate data with LEFT JOIN to handle missing users
function fetchCertificates($conn, $table, $type) {
    $sql = "SELECT 
                $table.id, 
                COALESCE(users.username, 'Unknown User') as username, 
                $table.created_at, 
                COALESCE($table.status, 'Pending') as status
            FROM $table 
            LEFT JOIN users ON $table.user_id = users.id";

    $result = $conn->query($sql);
    $certs = [];

    if ($result === false) {
        // Log the error for debugging
        error_log("Error in query for $table: " . $conn->error);
        return [];
    }

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $certs[] = [
                'id' => $row['id'],
                'username' => $row['username'],
                'type' => $type,
                'date' => $row['created_at'],
                'status' => $row['status']
            ];
        }
    }
    return $certs;
}

// Fetch from all certificate tables
$all = [];
$all = array_merge($all, fetchCertificates($conn, 'birth_certi', 'birth'));
$all = array_merge($all, fetchCertificates($conn, 'death_certi', 'death'));
$all = array_merge($all, fetchCertificates($conn, 'marriage_certi', 'marriage'));
$all = array_merge($all, fetchCertificates($conn, 'cenomar_certi', 'cenomar'));
$all = array_merge($all, fetchCertificates($conn, 'cenodeath_certi', 'cenodeath'));

echo json_encode($all);
$conn->close();
?>
