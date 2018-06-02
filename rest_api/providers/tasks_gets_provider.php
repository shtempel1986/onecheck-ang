<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 28.05.2018
 * Time: 23:08
 */

function tasksGetsProviders($urlData)
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

  if ($userId && !$taskDay) {
    $taskList = Task::getTaskListByUserId($userId);
    exit(json_encode($taskList, JSON_OPTIONS));
  }

  if ($userId && $taskDay && !$taskId) {
    $taskList = Task::getDayTaskListByUserId($userId, $taskDay);
    exit(json_encode($taskList, JSON_OPTIONS));
  }

  if ($userId && $taskDay && $taskId) {
    $task = Task::getTask($userId, $taskDay, $taskId);
    exit(json_encode($task, JSON_OPTIONS));
  }
  exit($userId . ' ' . $taskDay);
}