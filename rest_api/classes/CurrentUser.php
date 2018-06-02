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

    if (!$data) {
      return new ErrorResponse($link->error);
    }

    $data = mysqli_fetch_object($data);
    return new CurrentUser($data);

  }

  static function checkUserToken($userId, $sessionToken)
  {
    global $link;

    $sql = "SELECT * FROM onecheck.users WHERE userId = '$userId' limit 1";
    $data = $link->query($sql);
    $data = mysqli_fetch_object($data);

    $currentUser = new CurrentUser($data);

    $now = time();

    $sessionExpires = strtotime($currentUser->sessionExpires);

    if ($sessionExpires - $now < 0) {
      return new ErrorResponse('Время сессии истекло', 403);
    }

    if (!hash_equals($currentUser->sessionToken, $sessionToken)) {
      return new ErrorResponse('Неверный токен', 403);
    }
    return true;
  }

  static function checkUserId($userId){
    global $link;

    $sql = "SELECT * FROM onecheck.users WHERE userId = '$userId' limit 1";
    $data = $link->query($sql);
    $data = mysqli_fetch_object($data);
    if(!$data){
      new ErrorResponse('Пользователь не найден', 404);
    }
  }

  static function checkUserAuth($userId){
    $headers = getallheaders();
    $sessionToken = $headers['Authorization'];
    CurrentUser::checkUserId($userId);
    CurrentUser::checkUserToken($userId, $sessionToken);
  }
}