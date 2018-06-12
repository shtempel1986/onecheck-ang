<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 21:01
 */

class CurrentUser extends User
{
  public $sessionToken = null;
  public $sessionExpires = null;

  function __construct($userData)
  {
    if (isset($userData->sessionToken)) {
      $this->sessionToken = $userData->sessionToken;
    }
    if (isset($userData->sessionExpires)) {
      $this->sessionExpires = $userData->sessionExpires;
    }
    parent::__construct($userData);
  }

  static function getCurrentUserByEmail($email)
  {
    global $link;

    $sql = "SELECT * FROM users WHERE email = '$email'";
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

    $sql = "SELECT * FROM users WHERE userId = '$userId' limit 1";
    $data = $link->query($sql);
    $data = mysqli_fetch_object($data);

    $currentUser = new CurrentUser($data);

    $now = time();

    $sessions = json_decode($currentUser->sessionToken);

    $sessions = (array)$sessions;

    if (!$sessions) {
      new ErrorResponse('Ошибка авторизации 1', 403);
    }
    //перебор и удаление истекших
    foreach ($sessions as $token => $tokenExpires) {
      $tokenExpires = strtotime($tokenExpires);
      if ($now > $tokenExpires) {
        unset($sessions[$token]);
      }
    }

    if (!isset($sessions[$sessionToken])) {
      new ErrorResponse(json_encode($sessions) . ' ' . $sessionToken, 403);
    }

  }

  static function checkUserId($userId)
  {
    global $link;

    $sql = "SELECT * FROM users WHERE userId = '$userId' limit 1";
    $data = $link->query($sql);
    $data = mysqli_fetch_object($data);

    if (!$data) {
      new ErrorResponse('Ошибка бд: ' . $link->error);
    }

    if (!$data) {
      new ErrorResponse('Пользователь не найден', 404);
    }
  }

  static function checkUserAuth($userId)
  {
    $headers = getallheaders();
    $sessionToken = $headers['Authorization'];
    CurrentUser::checkUserId($userId);
    CurrentUser::checkUserToken($userId, $sessionToken);
  }
}