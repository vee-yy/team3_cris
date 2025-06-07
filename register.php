<?php
    include "connect.php";

    if($_SERVER["REQUEST_METHOD"] == "POST"){
       
        $username = mysqli_real_escape_string($conn, $_POST['username']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);
    
        //checks email
        $checkEmail = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($checkEmail);
        
        if($result->num_rows > 0){
            echo "Email already exists.";
        } else {
            $hashed_password = password_hash($password, PASSWORD_BCRYPT);

            $sql = "INSERT INTO users(username,email,password) VALUES ('$username','$email','$hashed_password')";
            if($conn->query($sql)===TRUE){
                echo "Account is created!";
<<<<<<< HEAD
                header("Location: index.html");
=======
                header("Location: index.php");
>>>>>>> 358c01b3e3dd65edede5562c359eb381e0c0f572
                exit();
            } else {
                echo "Error: " . $conn->error;
            }
        }
    }
?>