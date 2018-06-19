<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 19.06.2018
 * Time: 19:48
 */

function route($method, $urlData, $formData)
{
  switch ($method) {
    case "POST":{
//      $errorReport = new ErrorReport($formData);
      exit($formData);
    }
      break;

    case 'OPTIONS':
      exit(0);
      break;
  }
}