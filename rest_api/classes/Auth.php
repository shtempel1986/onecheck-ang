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

    if(!$data){
      return new ErrorResponse('Ошибка БД: ' . $link->error);
    }

    return !mysqli_num_rows($data);
  }

  function checkPassword(){
    global $link;

    $sql = "SELECT * FROM users WHERE email = '$this->email' LIMIT 1";
    $data = $link->query($sql);

    if(!$data){
      return new ErrorResponse('Ошибка БД: ' . $link->error);
    }

    $data = mysqli_fetch_object($data);

    if (!$data){
      return false;
    }

    $hash = $data->hash;
    $salt = $data->salt;

    $userHash = hash('sha512', $this->password . $salt);

    $result = hash_equals($hash, $userHash);

    if($result){
      $result = $this->updateToken();
    }

    return $result;
  }

  function updateToken(){

    $sessionToken = hash('sha512', $this->email . time());

    $sessionExpires = date('Y-m-d H:i:s', strtotime('+1 year'));
    global $link;

    $sql = /** @lang MySQL */
      "SELECT * FROM users WHERE email = '$this->email'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка бд: '. $link->error);
    }

    $data = mysqli_fetch_object($data);

    $sessions = json_decode($data->sessionToken);

    $currentUser = new CurrentUser($data);

    $sessions = (array) $sessions;

    $sessions[$sessionToken] = $sessionExpires;

    $sessions = json_encode($sessions);

    $sql = /** @lang MySQL */
      "UPDATE users set sessionToken = '$sessions'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка бд: '. $link->error);
    }

    $currentUser->sessionToken = $sessionToken;
    $currentUser->sessionExpires = $sessionExpires;
    return $currentUser;

  }
}