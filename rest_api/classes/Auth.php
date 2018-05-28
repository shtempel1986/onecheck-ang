<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:50
 */

class Auth
{
  private $email;
  private $password;
  function __construct($email,
                       $password)
  {
    $this->email = $email;
    $this->password = $password;
  }

  function checkEmail(){
    global $link;

    $sql = "SELECT * FROM users WHERE email = '$this->email'";
    $data = $link->query($sql);

    return !mysqli_num_rows($data);
  }

  function checkPassword(){
    global $link;

    $sql = "SELECT * FROM onecheck.users WHERE email = '$this->email' LIMIT 1";
    $data = $link->query($sql);

    $data = mysqli_fetch_object($data);

    if (!$data){
      return false;
    }

    $hash = $data->hash;
    $salt = $data->salt;

    $userHash = hash('sha512', $this->password . $salt);

    return hash_equals($hash, $userHash);

  }
}