<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 06.06.2018
 * Time: 17:47
 */

class WeeklyTask
{
  public $weeklyTaskId;
  public $weeklyTaskDay;
  public $userId;
  public $weeklyTaskDescription;

  function __construct($weeklyTaskData)
  {
    $this->weeklyTaskId = $weeklyTaskData->weeklyTaskId;
    $this->weeklyTaskDay = $weeklyTaskData->weeklyTaskDay;
    $this->userId = $weeklyTaskData->userId;
    $this->weeklyTaskDescription = $weeklyTaskData->weeklyTaskDescription;
  }

  /**
   * @param string $userId
   * @return array|ErrorResponse
   */
  static function getUserWeeklyTaskList($userId){
    global $link;

    $sql = /** @lang MySQL */
      "SELECT * from weeklyTasks where userId = '$userId' and weeklyTaskDisplay = true";
    $data = $link->query($sql);

    if(!$data){
      return new ErrorResponse('Ошибка БД: '. $link->error);
    }

    if(mysqli_num_rows($data) === 0){
      return [];
    }

    $weeklyTaskList = [];
    while ($row = mysqli_fetch_object($data)){
      $weeklyTaskList[] = new WeeklyTask($row);
    }

    return $weeklyTaskList;
  }

  /**
   * @param string $userId
   * @param string $weeklyTaskId
   * @return WeeklyTask|ErrorResponse
   */
  static function getWeeklyTaskById($userId, $weeklyTaskId)
  {
    global $link;

    $sql = /** @lang MySQL */
      "SELECT * from weeklyTasks 
            where userId = '$userId' 
            and weeklyTaskId = '$weeklyTaskId'
            and weeklyTaskDisplay = true
            limit 1";
    $data = $link->query($sql);

    if(!$data){
      return new ErrorResponse('Ошибка БД: '. $link->error);
    }

    $data = mysqli_fetch_object($data);

    if(!$data){
      return new ErrorResponse('Не найдено', 404);
    }

    return new WeeklyTask($data);
  }

  /**
   * @param $weeklyTask WeeklyTask
   * @return bool
   */
  static function addNewWeeklyTask($weeklyTask){

    global $link;

    $sql = /** @lang MySQL */
      "INSERT INTO weeklyTasks 
        set userId = '$weeklyTask->userId', 
        weeklyTaskDay = '$weeklyTask->weeklyTaskDay'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка БД: ' . $link->error);
    }

    $weeklyTaskId = $link->insert_id;

    return $weeklyTaskId;
  }

  /**
   * @param $weeklyTaskId string
   * @return boolean
   */
  static function deleteWeeklyTask($weeklyTaskId){

    global $link;

    $sql = /** @lang MySQL */
      "UPDATE weeklyTasks set weeklyTaskDisplay = false 
        where weeklyTaskId = '$weeklyTaskId'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка БД' . $link->error);
    }

    return $data;
  }

  /**
   * @param $weeklyTask WeeklyTask
   * @return boolean
   */
  static function updateWeeklyTask($weeklyTask){

    global $link;

    $sql = /** @lang MySQL */
      "UPDATE weeklyTasks 
        set weeklyTaskDescription = '$weeklyTask->weeklyTaskDescription',
        weeklyTaskDay = '$weeklyTask->weeklyTaskDay' ,
        userId = '$weeklyTask->userId' 
        where weeklyTaskId = '$weeklyTask->weeklyTaskId'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка БД' . $link->error);
    }

    return $data;
  }

  /**
   * @param $weeklyTaskId string
   * @param $weeklyTaskDescription string
   * @return boolean
   */
  static function changeDescription($weeklyTaskId, $weeklyTaskDescription){

    global $link;

    $sql = /** @lang MySQL */
      "UPDATE weeklyTasks 
        set weeklyTaskDescription = '$weeklyTaskDescription' 
        where weeklyTaskId = '$weeklyTaskId'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка БД' . $link->error);
    }

    return $data;
  }

  /**
   * @param $weeklyTaskId string
   * @param $weeklyTaskDay string
   * @return bool
   */
  static function changeDay($weeklyTaskId, $weeklyTaskDay){

    global $link;

    $sql = /** @lang MySQL */
      "UPDATE weeklyTasks 
        set weeklyTaskDay = '$weeklyTaskDay' 
        where weeklyTaskId = '$weeklyTaskId'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка БД' . $link->error);
    }

    return $data;
  }
}