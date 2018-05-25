<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:31
 */

function route($method, $urlData, $formData)
{
  if($method === 'POST'){
    $email = $formData->email;
    $password = $formData->password;
    $confirmPassword = $formData->confirmPassword;

    $registration = new Registration($email, $password, $confirmPassword);

    $registration->registration();

    $currentUser = CurrentUser::getCurrentUserByEmail($email);

    exit(json_encode($currentUser));
  }

}