<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 20.05.2018
 * Time: 18:00
 */

require_once 'requires.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, PATCH');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
header('Content-Type: application/json');

// Определяем метод запроса
$method = $_SERVER['REQUEST_METHOD'];
if($method === 'OPTIONS'){exit();}

// Получаем данные из тела запроса
$formData = getFormData($method);

// Получение данных из тела запроса
function getFormData($method)
{

  $headers = apache_request_headers();
  if ($method === 'GET') return $_GET;

  switch ($headers['Content-Type']) {
    //ЕСЛИ ПОЛУЧИЛИ JSON
    case 'application/json':
      {
        $data = json_decode(file_get_contents('php://input')) ;
        if(!$data){
          $data = file_get_contents('php://input');
        }
        return $data;
      }
      break;
    //ЕСЛИ ПОЛУЧИЛИ ТЕКСТ
    case 'text/plain':
      {
        $data = file_get_contents('php://input');
        return $data;
      }
      break;
  }

  //ЕСЛИ ПОЛУЧИЛИ НЕ JSON
  if ($headers['Content-Type'] !== 'application/json') {
    // GET или POST: данные возвращаем как есть
    if ($method === 'POST') return $_POST;

    // PUT, PATCH или DELETE
    $data = array();
    $exploded = explode('&', file_get_contents('php://input'));

    foreach ($exploded as $pair) {
      $item = explode('=', $pair);
      if (count($item) == 2) {
        $data[urldecode($item[0])] = urldecode($item[1]);
      }
    }
    exit('Content-Type');
  }
  return $data;
}

// Разбираем url
$url = (isset($_GET['q'])) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urls = explode('/', $url);

// Определяем роутер и url data
$router = $urls[0];
$urlData = array_slice($urls, 1);

// Подключаем файл-роутер и запускаем главную функцию
include_once "routers/$router.php";

route($method, $urlData, $formData);

$link->close();