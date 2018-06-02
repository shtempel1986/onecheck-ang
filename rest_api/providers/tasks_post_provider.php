<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 */

function taskPostProvider($urlData, $formData)
{

  $userId = null;
  if (isset($urlData[0])) {
    $userId = $urlData[0];
  } else {
    return new ErrorResponse('не хватает данных');
  }

  CurrentUser::checkUserAuth($userId);

  $taskDay = null;
  if (isset($urlData[1])) {
    $taskDay = $urlData[1];
  }
  if(!$taskDay){
    return new ErrorResponse('не хватает данных');
  }

  $response = Task::addTask($userId, $taskDay);
  $response = json_encode($response);

  exit($response);
}