<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 */

function weeklyTasksPutsProvider($urlData, $formData)
{

  $userId = null;
  if (isset($urlData[0])) {
    $userId = $urlData[0];
  }

  $weeklyTaskId = null;
  if (isset($urlData[1])) {
    $weeklyTaskId = $urlData[1];
  }

  if (!$weeklyTaskId || !$userId) {
    return new ErrorResponse('не хватает данных');
  }

  CurrentUser::checkUserAuth($userId);

  $response = WeeklyTask::updateWeeklyTask($formData);
  $response = json_encode($response);
  exit($response);

}