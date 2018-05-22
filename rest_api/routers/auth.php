<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 20.05.2018
 * Time: 18:03
 */


function route($method, $urlData, $formData)
{


  exit(json_encode([
      'method' => $method,
      'urlData' => $urlData,
      'formData' => $formData,
      'get' => $_GET,
      'requestData' => file_get_contents('php://input')]
  ));
}