<?php
/**
 * Created by PhpStorm.
 * User: o_gre
 * Date: 21.02.2018
 * Time: 19:19
 */
require_once 'config.php';

define('SALT_MAX_LENGTH', 6);
$email = $_POST['email'];

$password = filter_input(INPUT_POST,'password');

class RegistrationResponse
{
  public $resultText;
  public $userEmail;
  public $result;
  function __construct($text,$email,$result)
  {
    $this->resultText = $text;
    $this->userEmail = $email;
    $this->result = $result;
  }
  function __toString()
  {
    return json_encode($this);
  }
}

class Registration
{
  function newUser($email, $password)
  {
    global $link;

    if ($this->emailIsFree($email)) {
      $intermediateSalt = md5(uniqid(rand(), true));
      $salt = substr($intermediateSalt, 0, SALT_MAX_LENGTH);
      $hash = hash("sha256", $password . $salt);

      $stmt = $link->prepare("INSERT INTO users (email,password,salt) VALUES (?,?,?)");
      $stmt->bind_param('sss', $email, $hash, $salt);
      $stmt->execute();
      return new RegistrationResponse('user adding success',$email, true);
    } else {
      return new RegistrationResponse('email is used', null, false);
    }
  }

  function emailIsFree($email)
  {
    global $link;
    $sql = "SELECT * FROM users WHERE email = '" . $email . "'";
    $data = $link->query($sql);
    if (mysqli_num_rows($data)) {
      return false;
    } else {
      return true;
    }
  }
}


$registration = new Registration();

header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, POST, PUT');
header('Access-Control-Allow-Headers: *');
header('Content-Type: text/plain');

if (isset($_POST)){
  echo $password;
}

//echo  $email;

//if(isset($email) && isset($password)){
//  echo $registration->newUser($email, $password);
//} else {
//  echo new RegistrationResponse('no password or email', null, false);
//}