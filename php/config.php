<?php
/**
 * Created by PhpStorm.
 * User: o_gre
 * Date: 21.02.2018
 * Time: 17:14
 */

//Хост
define("DB_HOST", "mysql94.1gb.ru");
//Имя пользователя
define("DB_USER", "gb_onecheck");
//Пароль пользователя
define("DB_PASS", "8aa652zd689a");
//Название базы данных
define("DB_NAME", "gb_onecheck");

define('__ROOT__', $_SERVER['DOCUMENT_ROOT']."/ointeres");

$link = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if($link->connect_errno) {
  echo "Не удалось подключиться к базе данных: (" . $link->connect_errno . ") " . $link->connect_error;
}

date_default_timezone_set('Europe/Moscow');
