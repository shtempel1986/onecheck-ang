<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 */

function weeklyTasksDeleteProvider($urlData)
{

  $userId = null;
  if (isset($urlData[0])) {
    $userId = $urlData[0];
  }

  CurrentUser::checkUserAuth($userId);

  $weeklyTaskId = null;
  if (isset($urlData[1])) {
    $weeklyTaskId = $urlData[1];
  }

  if (!$weeklyTaskId || !$userId) {
    return new ErrorResponse('не хватает данных');
  }

  $response = WeeklyTask::deleteWeeklyTask($weeklyTaskId);
  $response = json_encode($response);
  exit($response);
}