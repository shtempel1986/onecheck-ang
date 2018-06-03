<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:38
 */

define('SALT_MAX_LENGTH',8);
define('JSON_OPTIONS', JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$dbpass = "8aa652zd689a";
$dblogin = "gb_onecheck";
$dbhost = "mysql94.1gb.ru";
$dbname = "gb_onecheck";

date_default_timezone_set('Europe/Moscow');

$link = mysqli_connect($dbhost, $dblogin, $dbpass, $dbname);
$link->set_charset("utf8");
