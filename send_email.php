<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['fullname'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "ashwinbshetty373@gmail.com";
    $subject = "New Contact Form Submission";
    
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n\n";
    $email_body .= "Message:\n$message";
    
    $headers = "From: $email";
    
    if(mail($to, $subject, $email_body, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Email sending failed.";
    }
}
?> 