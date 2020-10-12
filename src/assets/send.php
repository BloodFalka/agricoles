<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$message = $_POST['message'];

$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email);
$message = htmlspecialchars($message);

$name = urldecode($name);
$phone = urldecode($phone);
$email = urldecode($email);
$message = urldecode($message);

$name = trim($name);
$phone = trim($phone);
$email = trim($email);
$message = trim($message);
echo $fio;
echo "<br>";
echo $email;
if (mail("bloodfallka@gmail.com", 
        "Заявка с сайта", "Имя:".$name.". E-mail: ".$email .". Телефон .".$phone.".Сообщение.".$message,
        "From: bloodfalka@bloodfalka.ru\r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>