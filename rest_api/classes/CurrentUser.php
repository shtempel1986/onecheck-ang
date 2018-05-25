<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 21:01
 */

class CurrentUser extends User
{
  public $sessionToken;
  public $sessionExpires;

  function __construct($userData)
  {
    $this->sessionToken = $userData->sessionToken;
    $this->sessionExpires = $userData->sessionExpires;
    parent::__construct($userData);
  }

  static function getCurrentUserByEmail($email)
  {
    global $link;

    $sql = "SELECT * FROM onecheck.users WHERE email = '$email'";
    $data = $link->query($sql);

    if(!$data){
      return new ErrorResponse($link->error);
    }

    $data = mysqli_fetch_object($data);
    return new CurrentUser($data);

  }
}