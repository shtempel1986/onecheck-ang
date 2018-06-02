<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 */

function taskDeleteProvider($urlData)
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

  $taskId = null;
  if (isset($urlData[2])) {
    $taskId = $urlData[2];
  }
  if (!$taskDay&&!$taskId) {
    return new ErrorResponse('не хватает данных');
  }

  $response = Task::deleteTask($userId, $taskDay ,$taskId);
  $response = json_encode($response);
  exit($response);
}