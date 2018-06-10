<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 28.05.2018
 * Time: 23:08
 */

function weeklyTasksGetsProviders($urlData)
{

  $userId = null;
  if (isset($urlData[0])) {
    $userId = $urlData[0];
  } else {
    return new ErrorResponse('не хватает данных');
  }

  CurrentUser::checkUserAuth($userId);

  $weeklyTaskId = null;
  if (isset($urlData[1])) {
    $weeklyTaskId = $urlData[1];
  }

  if ($userId && !$weeklyTaskId) {
    $weeklyTaskList = WeeklyTask::getUserWeeklyTaskList($userId);
    exit(json_encode($weeklyTaskList, JSON_OPTIONS));
  }

  if ($userId && $weeklyTaskId) {
    $weeklyTask = WeeklyTask::getWeeklyTaskById($userId, $weeklyTaskId);
    exit(json_encode($weeklyTask, JSON_OPTIONS));
  }
  exit($userId . ' ' . $weeklyTaskId);
}