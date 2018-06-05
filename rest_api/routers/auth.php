<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 20.05.2018
 * Time: 18:03
 */


function route($method, $urlData, $formData)
{


  if($method === 'POST'){
    $email = $formData->email;
    $password = $formData->password;

    $auth = new Auth($email, $password);

    if($auth->checkEmail()){
       new ErrorResponse('Пользователь не найден');
    }

    if(!$auth->checkPassword()){
       new ErrorResponse('Пароль не верен');
    }

    $currentUser = CurrentUser::getCurrentUserByEmail($email);

    exit(json_encode($currentUser));

  }

}