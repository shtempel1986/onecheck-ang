<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 28.05.2018
 * Time: 23:06
 */

class Task
{
  public $taskId;
  public $taskCompleted;
  public $taskDescription;
  public $taskDay;
  public $userId;

  function __construct($taskData)
  {
    $this->taskId = $taskData->taskId;
    $this->taskCompleted = $taskData->taskCompleted;
    $this->taskDescription = $taskData->taskDescription;
    $this->taskDay = $taskData->taskDay;
    $this->userId = $taskData->userId;
  }

  static function getTaskListByUserId($userId)
  {
    global $link;

    $sql = "SELECT * from tasks WHERE userId = '$userId'";
    $data = $link->query($sql);

    $taskList = [];
    while ($row = mysqli_fetch_object($data)) {
      $taskList[] = new Task($row);
    }
    return $taskList;
  }

  static function getDayTaskListByUserId($userId, $taskDay)
  {
    global $link;

    $sql = "SELECT * from tasks WHERE userId = '$userId' and taskDay = '$taskDay'";
    $data = $link->query($sql);

    $taskList = [];
    while ($row = mysqli_fetch_object($data)) {
      $taskList[] = new Task($row);
    }
    return $taskList;
  }

  static function getTask($userId, $taskDay, $taskId)
  {
    global $link;

    $sql = "SELECT * from tasks 
            WHERE userId = '$userId' 
            and taskDay = '$taskDay' 
            and taskId = '$taskId' 
            limit 1";
    $data = $link->query($sql);

    $task = mysqli_fetch_object($data);

    return $task;
  }
}