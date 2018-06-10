<?php
/**
 * Created by PhpStorm.
 * User: o_gredi@mail.ru
 * Date: 25.05.2018
 * Time: 20:38
 */

require_once 'config.php';

//КЛАССЫ
require_once 'classes/Registration.php';
require_once 'classes/User.php';
require_once 'classes/CurrentUser.php';
require_once 'classes/ErrorResponse.php';
require_once 'classes/Auth.php';
require_once 'classes/Task.php';
require_once 'classes/WeeklyTask.php';

//ПРОВАЙДЕРЫ

require_once 'providers/tasks_gets_provider.php';
require_once 'providers/tasks_puts_provider.php';
require_once 'providers/tasks_post_provider.php';
require_once 'providers/tasks_delete_provider.php';
require_once 'providers/weekly_tasks/weekly_tasks_delete_provider.php';
require_once 'providers/weekly_tasks/weekly_tasks_puts_provider.php';
require_once 'providers/weekly_tasks/weekly_tasks_post_provider.php';
require_once 'providers/weekly_tasks/weekly_tasks_gets_provider.php';
require_once 'providers/weekly_tasks/weekly_tasks_patch_provider.php';