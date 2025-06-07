<?php
session_start();
include 'connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_SESSION['user_id'])) {
        $_SESSION['user_id'] = 1; // For testing
    }

    $user_id = $_SESSION['user_id'];
    $certificateType = $_POST['certificate_type'];

    if ($certificateType === 'birth') {
        // BIRTH CERTIFICATE
        $child_firstname = $_POST['birthFirstname'];
        $child_middlename = $_POST['birthMiddleInitial'];
        $child_lastname = $_POST['birthLastname'];
        $child_suffix = $_POST['birthSuffix'];
        $child_date_birth = $_POST['birthDateOfBirth'];
        $child_place_birth = $_POST['birthPlaceOfBirth'];
        $sexual_orientation = $_POST['birthOrientation'];
        $nationality = $_POST['birthNationality'];

        $mother_firstname = $_POST['birthMotherMaidenName'];
        $mother_middlename = $_POST['birthMotherMiddleInitial'];
        $mother_lastname = $_POST['birthMotherLastName'];

        $father_firstname = $_POST['birthFatherFirstName'];
        $father_middlename = $_POST['birthFatherMiddleInitial'];
        $father_lastname = $_POST['birthFatherLastName'];
        $father_suffix = $_POST['birthFatherSuffix'];

        $purpose_certi = $_POST['birthPurpose'];
        $number_copies = $_POST['birthCopiesNeeded'];

        $sql = "INSERT INTO birth_certi (
                    user_id, status,
                    child_firstname, child_middlename, child_lastname, child_suffix,
                    child_date_birth, child_place_birth, sexual_orientation, nationality,
                    mother_maiden_firstname, mother_maiden_middlename, mother_maiden_lastname,
                    father_firstname, father_middlename, father_lastname, father_suffix,
                    purpose_certi, number_copies, created_at
                ) VALUES (
                    ?, 'PENDING',
                    ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, NOW()
                )";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "isssssssssssssssssi",
            $user_id,
            $child_firstname, $child_middlename, $child_lastname, $child_suffix,
            $child_date_birth, $child_place_birth, $sexual_orientation, $nationality,
            $mother_firstname, $mother_middlename, $mother_lastname,
            $father_firstname, $father_middlename, $father_lastname, $father_suffix,
            $purpose_certi, $number_copies
        );

    } elseif ($certificateType === 'death') {
        // DEATH CERTIFICATE
        $dead_firstname = $_POST['deathFirstName'];
        $dead_middlename = $_POST['deathMiddleInitial'];
        $dead_lastname = $_POST['deathLastName'];
        $dead_suffix = $_POST['deathSuffix'];
        $date_birth = $_POST['birthofdeath'];
        $date_death = $_POST['deathDateOfDeath'];
        $sexual_orientation = $_POST['deathOrientation'];
        $nationality = $_POST['deathNationality'];
        $place_death = $_POST['deathCompleteAddress'];
        $purpose_certi = $_POST['deathPurpose'];
        $number_copies = $_POST['deathCopiesNeeded'];

        $sql = "INSERT INTO death_certi (
                    user_id, status,
                    dead_firstname, dead_middlename, dead_lastname, dead_suffix,
                    date_birth, date_death, sexual_orientation, nationality, place_death,
                    purpose_certi, number_copies, created_at
                ) VALUES (
                    ?, 'PENDING',
                    ?, ?, ?, ?,
                    ?, ?, ?, ?, ?,
                    ?, ?, NOW()
                )";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "isssssssssisi",
            $user_id, $dead_firstname, $dead_middlename, $dead_lastname, $dead_suffix,
            $date_birth, $date_death, $sexual_orientation, $nationality, $place_death,
            $purpose_certi, $number_copies
        );

    } elseif ($certificateType === 'marriage') {
        // MARRIAGE CERTIFICATE
        $wife_firstname = $_POST['marriageWifefirst'];
        $wife_middle_name = $_POST['marriageWifeMiddle'];
        $wife_lastname = $_POST['marriageWifelast'];

        $husband_firstname = $_POST['marriageHusbandfirst'];
        $husband_middle_name = $_POST['marriageHusbandmiddle'];
        $husband_lastname = $_POST['marriageHusbandlast'];
        $husband_suffix = $_POST['marriageHusbandSuffix'];

        $date_marriage = $_POST['marriageDateOfMarriage'];
        $place_marriage = $_POST['marriagePlaceOfMarriage'];
        $wife_nationality = $_POST['marriageWifeNationality'];
        $husband_nationality = $_POST['marriageHusbandNationality'];
        $purpose_certi = $_POST['marriagePurpose'];
        $number_copies = $_POST['marriageCopiesNeeded'];

        $sql = "INSERT INTO marriage_certi (
                    user_id, status,
                    wife_firstname, wife_middle_name, wife_lastname,
                    husband_firstname, husband_middle_name, husband_lastname, husband_suffix,
                    date_marriage, place_marriage,
                    wife_nationality, husband_nationality,
                    purpose_certi, number_copies, created_at
                ) VALUES (
                    ?, 'PENDING',
                    ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?,
                    ?, ?,
                    ?, ?, NOW()
                )";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "issssssssssssi",
            $user_id,
            $wife_firstname, $wife_middle_name, $wife_lastname,
            $husband_firstname, $husband_middle_name, $husband_lastname, $husband_suffix,
            $date_marriage, $place_marriage,
            $wife_nationality, $husband_nationality,
            $purpose_certi, $number_copies
        );

    } elseif ($certificateType === 'cenomar') {
        // CENOMAR
        $child_firstname = $_POST['cenomarChildFirstName'];
        $child_middlename = $_POST['cenomarChildMiddleInitial'];
        $child_lastname = $_POST['cenomarChildLastName'];
        $child_suffix = $_POST['cenomarChildSuffix'];
        $date_birth = $_POST['cenomarDateOfBirth']; 
        $place_birth = $_POST['cenomarPlaceOfBirth']; 
        $sexual_orientation = $_POST['cenomarOrientation']; 
        $child_nationality = $_POST['cenomarNationality']; 

        $mother_firstname = $_POST['cenomarMotherFirstName'];
        $mother_middlename = $_POST['cenomarMotherMiddleInitial'];
        $mother_lastname = $_POST['cenomarMotherLastName'];

        $father_firstname = $_POST['cenomarFatherFirstName'];
        $father_middlename = $_POST['cenomarFatherMiddleInitial'];
        $father_lastname = $_POST['cenomarFatherLastname'];
        $father_suffix = $_POST['cenomarFatherSuffix'];

        $address = $_POST['cenomarCompleteAddress']; 
        $purpose_certi = $_POST['cenomarPurpose']; 
        $number_copies = $_POST['cenomarCopiesNeeded'];

        $sql = "INSERT INTO cenomar_certi (
                    user_id, status,
                    child_firstname, child_middlename, child_lastname, child_suffix,
                    mother_maiden_firstname, mother_maiden_middlename, mother_maiden_lastname,
                    father_firstname, father_middlename, father_lastname, father_suffix,
                    date_birth, place_birth, address, number_copies, created_at
                ) VALUES (
                    ?, 'PENDING',
                    ?, ?, ?, ?,
                    ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, ?, ?, NOW()
                )";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "isssssssssssssssii",
            $user_id, $child_firstname, $child_middlename, $child_lastname, $child_suffix,
            $mother_firstname, $mother_middlename, $mother_lastname,
            $father_firstname, $father_middlename, $father_lastname, $father_suffix,
            $date_birth, $place_birth, $address, $number_copies
        );

    } elseif ($certificateType === 'cenodeath') {
        // CENODEATH
        $deceased_firstname = $_POST['cenodeathFirstName'];
        $deceased_middlename = $_POST['cenodeathMiddleInitial'];
        $deceased_lastname = $_POST['cenodeathLastName'];
        $deceased_suffix = $_POST['cenodeathSuffix'];
        $date_birth = $_POST['cenodeathDateOfBirth'];
        $place_birth = $_POST['cenodeathPlaceOfBirth'];
        $sexual_orientation = $_POST['cenodeathOrientation'];
        $nationality = $_POST['cenodeathNationality'];

        $mother_firstname = $_POST['cenodeathMotherFirstName'];
        $mother_middlename = $_POST['cenodeathMotherMiddleInitial'];
        $mother_lastname = $_POST['cenodeathMotherLastName'];

        $father_firstname = $_POST['cenodeathFatherFirstName'];
        $father_middlename = $_POST['cenodeathFatherMiddleInitial'];
        $father_lastname = $_POST['cenodeathFatherLastName'];
        $father_suffix = $_POST['cenodeathFatherSuffix'];

        $address = $_POST['cenodeathCompleteAddress'];
        $purpose_cert = $_POST['cenodeathPurpose'];
        $number_copies = $_POST['cenodeathCopiesNeeded'];

        $sql = "INSERT INTO cenodeath_certi (
                    user_id, status,
                    deceased_firstname, deceased_middlename, deceased_lastname, deceased_suffix,
                    mother_firstname, mother_middlename, mother_lastname,
                    father_firstname, father_middlename, father_lastname, father_suffix,
                    date_birth, place_birth, address, purpose_cert, number_copies, created_at
                ) VALUES (
                    ?, 'PENDING',
                    ?, ?, ?, ?,
                    ?, ?, ?,
                    ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, NOW()
                )";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param(
            "issssssssssssssssi",
            $user_id,
            $deceased_firstname, $deceased_middlename, $deceased_lastname, $deceased_suffix,
            $mother_firstname, $mother_middlename, $mother_lastname,
            $father_firstname, $father_middlename, $father_lastname, $father_suffix,
            $date_birth, $place_birth, $address, $purpose_cert, $number_copies
        );
    }


    if (isset($stmt) && $stmt->execute()) {
        echo ucfirst($certificateType) . " certificate submitted successfully.";
    } else {
        echo "Error: " . ($stmt ? $stmt->error : "No statement prepared");
    }

    if (isset($stmt)) $stmt->close();
    $conn->close();
}
?>
