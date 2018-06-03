<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:31
 */

class Registration
{
  private $email;
  private $password;
  private $confirmPassword;

  function __construct($email,
                       $password,
                       $confirmPassword)
  {
    $this->email = $email;
    $this->password = $password;
    $this->confirmPassword = $confirmPassword;
  }

  function registration()
  {
    global $link;

    $auth = new Auth($this->email, $this->password);

    if (!$auth->checkEmail()) {
      return new ErrorResponse('Email занят!');
    }

    if($this->password !== $this->confirmPassword){
      return new ErrorResponse('Пароли не совпадают!');
    }

    $salt = md5(uniqid(rand(), true));
    $salt = substr($salt, 0, SALT_MAX_LENGTH);
    $hash = hash("sha512", $this->password . $salt);

    $sessionToken = hash('sha512', $this->email . time());

    $sessionExpires = date('Y-m-d H:i:s', strtotime('+1 year'));

    $sql = "INSERT INTO users 
            (email, hash, salt, sessionToken, sessionExpires)  
            VALUE (
            '$this->email',
            '$hash',
            '$salt',
            '$sessionToken',
            '$sessionExpires'
            )";
    $data = $link->query($sql);

    if(!$data){
      return new ErrorResponse($link->error);
    }
    return true;
  }
}