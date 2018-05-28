<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:59
 */

class User
{
  public $userId;
  public $email;

  function __construct($userData)
  {
    $this->userId = $userData->userId;
    $this->email = $userData->email;
  }
}