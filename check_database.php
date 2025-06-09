<?php
header('Content-Type: text/plain');

// Database connection
$host = "localhost";
$username = "root";
$password = "";
$dbname = "civil_registry";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to check if table exists and show its structure
function checkTable($conn, $tableName) {
    echo "\n\n=== Checking table: $tableName ===\n";
    
    // Check if table exists
    $result = $conn->query("SHOW TABLES LIKE '$tableName'");
    if ($result->num_rows == 0) {
        echo "Table '$tableName' does NOT exist!\n";
        return;
    }
    
    // Show table structure
    echo "Table structure:\n";
    $result = $conn->query("DESCRIBE $tableName");
    while ($row = $result->fetch_assoc()) {
        echo "- {$row['Field']} ({$row['Type']})\n";
    }
    
    // Count rows
    $result = $conn->query("SELECT COUNT(*) as count FROM $tableName");
    $count = $result->fetch_assoc()['count'];
    echo "\nNumber of rows: $count\n";
    
    // Show first few rows if any
    if ($count > 0) {
        echo "\nSample data (first 3 rows):\n";
        $result = $conn->query("SELECT * FROM $tableName LIMIT 3");
        while ($row = $result->fetch_assoc()) {
            print_r($row);
        }
    }
}

// Check all relevant tables
checkTable($conn, 'users');
checkTable($conn, 'birth_certi');
checkTable($conn, 'death_certi');
checkTable($conn, 'marriage_certi');
checkTable($conn, 'cenomar_certi');
checkTable($conn, 'cenodeath_certi');

// Check relationships
function checkRelationship($conn, $table, $foreignKey, $referenceTable) {
    echo "\n\n=== Checking relationship: $table.$foreignKey -> $referenceTable.id ===\n";
    
    // Check for orphaned records
    $sql = "SELECT COUNT(*) as orphaned FROM $table 
            LEFT JOIN $referenceTable ON $table.$foreignKey = $referenceTable.id 
            WHERE $referenceTable.id IS NULL";
    
    $result = $conn->query($sql);
    $orphaned = $result->fetch_assoc()['orphaned'];
    
    if ($orphaned > 0) {
        echo "WARNING: Found $orphaned orphaned records in $table with no matching $referenceTable.id\n";
    } else {
        echo "No orphaned records found.\n";
    }
}

// Check relationships for each certificate table
checkRelationship($conn, 'birth_certi', 'user_id', 'users');
checkRelationship($conn, 'death_certi', 'user_id', 'users');
checkRelationship($conn, 'marriage_certi', 'user_id', 'users');
checkRelationship($conn, 'cenomar_certi', 'user_id', 'users');
checkRelationship($conn, 'cenodeath_certi', 'user_id', 'users');

$conn->close();
?>
