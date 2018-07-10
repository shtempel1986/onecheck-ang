<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:38
 */

define('SALT_MAX_LENGTH',8);
define('JSON_OPTIONS', JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

$dbData = file_get_contents(__DIR__.'/db_access');
$dbData = json_decode($dbData);

$dbpass = $dbData->dbpass;
$dblogin = $dbData->dblogin;
$dbhost = $dbData->dbhost;
$dbname = $dbData->dbname;

date_default_timezone_set('Europe/Moscow');

$link = mysqli_connect($dbhost, $dblogin, $dbpass, $dbname);
$link->set_charset("utf8");
