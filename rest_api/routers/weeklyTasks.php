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
      weeklyTasksPostProvider($urlData, $formData);
      break;
    case 'PUT':
      weeklyTasksPutsProvider($urlData, $formData);
      break;
    case 'PATCH':
      weeklyTasksPatchProvider($urlData, $formData);
      break;
    case 'DELETE':
      weeklyTasksDeleteProvider($urlData);
      break;
    case 'GET':
      weeklyTasksGetsProviders($urlData);
      break;
    case 'OPTIONS':
      exit(0);
      break;
  }

//        exit(json_encode([
//            'method' => $method,
//            'urlData' => $urlData,
//            'formData' => $formData
//          ]
//        ));

}