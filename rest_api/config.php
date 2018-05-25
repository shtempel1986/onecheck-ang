<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:38
 */

define('SALT_MAX_LENGTH',8);

$dbpass = "";
$dblogin = "root";
$dbhost = "127.0.0.1:3306";
$dbname = "onecheck";

date_default_timezone_set('Europe/Moscow');

$link = mysqli_connect($dbhost, $dblogin, $dbpass, $dbname);
$link->set_charset("utf8");
