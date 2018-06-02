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

    $sql = "SELECT * from tasks 
            WHERE userId = '$userId' and taskDay = '$taskDay' and taskDisplayed = true";
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
            and taskDisplayed = true 
            limit 1";
    $data = $link->query($sql);

    $task = mysqli_fetch_object($data);
    $task = new Task($task);

    return $task;
  }

  static function changeCompleteTask($taskId, $userId, $taskCompleted)
  {
    global $link;
    $sql = "UPDATE tasks SET taskCompleted = '$taskCompleted' 
            WHERE userId = '$userId' AND taskId = '$taskId'";
    $data = $link->query($sql);
    if (!$data) {
      new ErrorResponse('Ошибка БД');
    }
    exit("true");
  }

  static function changeDescriptionTask($taskId, $userId, $taskDescription)
  {
    global $link;

    $sql = "UPDATE tasks SET taskDescription = '$taskDescription' 
            WHERE userId = '$userId' AND taskId = '$taskId'";
    $data = $link->query($sql);

    if (!$data) {
      new ErrorResponse('Ошибка БД: ' . $link->error);
    }
    exit("true");
  }

  static function addTask($userId, $taskDay)
  {
    global $link;

    $sql = "INSERT INTO tasks (userId, taskDay) VALUES ('$userId', '$taskDay')";
    $data = $link->query($sql);

    if (!$data) {
      new ErrorResponse('Ошибка БД: ' . $link->error);
    }

    $newTaskId = $link->insert_id;
    $newTask = self::getTask($userId, $taskDay, $newTaskId);
    return $newTask;
  }

  static function deleteTask($userId, $taskDay, $taskId){
    global $link;

    $sql = "UPDATE tasks SET taskDisplayed = false 
            where userId = '$userId' and taskDay = '$taskDay' and taskId = '$taskId'";
    $data = $link->query($sql);

    if (!$data) {
      new ErrorResponse('Ошибка БД: ' . $link->error);
    }

    return $taskId;
  }
}