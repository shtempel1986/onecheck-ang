<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 * @param $urlData array
 * @param $formData string | object
 * @return ErrorResponse
 */

function weeklyTasksPatchProvider($urlData, $formData)
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

  $patchMethod = null;
  if (isset($urlData[2])) {
    $patchMethod = $urlData[2];
  }

  if (!$weeklyTaskId || !$userId || !$patchMethod) {
    return new ErrorResponse('не хватает данных');
  }

  switch ($patchMethod) {
    case 'description':
      $response = WeeklyTask::changeDescription($weeklyTaskId, $formData);
      break;
    case 'day':
      $response = WeeklyTask::changeDay($weeklyTaskId, $formData);
      break;
    default:
      return new ErrorResponse('Свойство не найденно', 404);
      break;
  }

  $response = json_encode($response);
  exit($response);

}