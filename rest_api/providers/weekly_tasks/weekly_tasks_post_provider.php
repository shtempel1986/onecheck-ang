<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 */

function weeklyTasksPostProvider($urlData, $formData)
{

  $userId = null;
  if (isset($urlData[0])) {
    $userId = $urlData[0];
  } else {
    return new ErrorResponse('не хватает данных');
  }

  CurrentUser::checkUserAuth($userId);

  $weeklyTask = $formData;

  $res = WeeklyTask::addNewWeeklyTask($weeklyTask);
  exit(json_encode($res));
}