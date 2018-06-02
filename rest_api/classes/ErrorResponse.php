<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 21:34
 */

class ErrorResponse
{

  public function __construct($message, $responseCode = 501)
  {
    global $link;
    http_response_code($responseCode);
    $link->close();
    exit($message);
  }
}