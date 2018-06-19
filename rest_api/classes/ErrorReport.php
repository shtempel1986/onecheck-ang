<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 19.06.2018
 * Time: 19:16
 */

class ErrorReport
{
  public $userId;
  public $serverInfo;
  public $errorDataFromClient;

  /**
   * ErrorReport constructor.
   * @param $errorData object
   */
  function __construct($errorData)
  {
    $this->userId = $errorData->userId;
    $this->errorDataFromClient = json_encode($errorData->errorDataFromClient);
    $this->serverInfo =json_encode($_SERVER,JSON_PRETTY_PRINT);
  }

  /**
   * @return bool
   */
  function saveToDb(){
    global $link;

    $sql = /** @lang MySQL */
      "INSERT INTO errors 
        SET userId = '$this->userId',
        errorDataFromClient = '$this->errorDataFromClient',
        serverInfo = '$this->serverInfo'";
    $data = $link->query($sql);

    if(!$data){
      new ErrorResponse('Ошибка БД: '. $link->error);
      return false;
    }
    else{
      return true;
    }
  }
}