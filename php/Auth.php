<?php
/**
 * Created by PhpStorm.
 * User: o_gre
 * Date: 21.02.2018
 * Time: 16:42
 */
require_once 'config.php';

define('SALT_MAX_LENGTH', 6);

class Auth
{
  public $password;
  private $email;


  function __construct($email, $password)
  {
    $this->email = $email;
    $this->password = $password;
  }
  function checkPassword(){
    global $link;
    $sql = "SELECT * FROM users WHERE email = '".$this->email."'";
    $data = $link->query($sql);
    if (mysqli_num_rows($data)>0){

      $savedData = mysqli_fetch_array($data);
      $savedHash = $savedData['password'];
      $hash = hash("sha256", $this->password . $savedData['salt']);
      if ($savedHash == $hash ){
        return true;
      }
    }
    return 'invalid password or email';
  }
}

$auth = new Auth('o_gredi@mail.ru','12345d6');

echo $auth->checkPassword();
