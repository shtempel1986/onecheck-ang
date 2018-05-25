<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 21:34
 */

class ErrorResponse
{

  public function __construct($message)
  {
    global $link;
    http_response_code(501);
    $link->close();
    exit($message);
  }
}