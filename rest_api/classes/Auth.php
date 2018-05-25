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
}