<?php
header('Content-Type: application/json');

// DB credentials
$host = "localhost";
$user = "root"; 
$pass = "";
$dbname = "civil_registry"; 

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
  http_response_code(500);
  echo json_encode(['error' => 'Database connection failed']);
  exit;
}

// Helper to fetch certificate data with JOIN to get username
function fetchCertificates($conn, $table, $type) {
  $sql = "SELECT $table.id, users.username, $table.created_at, $table.status 
          FROM $table 
          INNER JOIN users ON $table.user_id = users.id";

  $result = $conn->query($sql);
  $certs = [];  

  if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $certs[] = [
        'id' => $row['id'],
        'username' => $row['username'],     // This now correctly shows the account username
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
