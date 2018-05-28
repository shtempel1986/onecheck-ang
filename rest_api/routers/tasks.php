<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 20.05.2018
 * Time: 18:03
 */


function route($method, $urlData, $formData)
{
  switch ($method) {
    case 'POST':
      {

      }
      break;
    case 'PUT':
      {

      }
      break;
    case 'DELETE':
      {

      }
      break;
    case 'GET':
      {
        tasksGetsProviders($urlData);

      }
      break;
  }

//        exit(json_encode([
//            'method' => $method,
//            'urlData' => $urlData,
//            'formData' => $formData
//          ]
//        ));

}