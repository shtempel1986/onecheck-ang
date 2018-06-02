<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 31.05.2018
 * Time: 21:30
 */

function taskPutsProvider($urlData, $formData)
{

  $userId = null;
  if (isset($urlData[0])) {
    $userId = $urlData[0];
  } else {
    return new ErrorResponse('не хватает данных');
  }

  $taskDay = null;
  if (isset($urlData[1])) {
    $taskDay = $urlData[1];
  }

  $taskId = null;
  if (isset($urlData[2])) {
    $taskId = $urlData[2];
  }

  $taskMethod = null;
  if (isset($urlData[3])) {
    $taskMethod = $urlData[3];
  }

  CurrentUser::checkUserAuth($userId);

  switch ($taskMethod) {
    case 'complete':
      {
        $taskCompleted = $formData;
        Task::changeCompleteTask($taskId, $userId, $taskCompleted);
      }
      break;

    case 'description':
      {
        $taskDescription = $formData;
        Task::changeDescriptionTask($taskId, $userId, $taskDescription);
      }
      break;

    default :
      new ErrorResponse('Неверный Метод');
  }

  exit($formData);
}