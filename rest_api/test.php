<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 21.05.2018
 * Time: 22:28
 */

//$headers = apache_request_headers();
//$email = filter_input(INPUT_POST, 'email');
//header('Access-Control-Allow-Origin: *');
//header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS, PATCH');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
//exit(file_get_contents('php://input'));

$data = file_get_contents('./db_access');

exit($data);