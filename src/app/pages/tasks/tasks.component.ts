import {Component, Injectable, OnDestroy, OnInit} from "@angular/core"
import {CalendarModel} from "../../models/calendar.model";
import {TaskModel} from "../../components/task/task.model";
import {TasksService} from "./tasks.service";
import {WeeklyTasksService} from "../../services/weekly-tasks.service";
import {Subscription} from "rxjs/Subscription";
import {WeeklyTask} from "../../models/WeeklyTask";
import {ErrorHandlersService} from "../../services/error-handlers.service";

@Injectable()
@Component({
  selector: 'tasks',
  templateUrl: 'tasks.component.html',
  styleUrls: ['tasks.component.sass']
})
export class TasksComponent implements OnInit, OnDestroy {
  public tasks: TaskModel[];
  public unsubscribe: Array<Subscription> = [];
  private weeklyTaskList: Array<WeeklyTask>;
  private taskUpdated: boolean = false;
  public loading: boolean;

  constructor(public calendar: CalendarModel,
              private tasksService: TasksService,
              private weeklyTasksService: WeeklyTasksService,
              private errorHandlers: ErrorHandlersService) {
  }

  ngOnInit() {
    this.getTasks();
    this.tasksService.updateTask(task => {
      this.tasks.push(task);
    });
    this.tasksService.deleteTask(taskId => {
      this.deleteTask(taskId);
    });

    //получение списка еженедельных задач на текущий день
    this.unsubscribe.push(this.weeklyTasksService.getWeeklyTaskList().subscribe(weeklyTaskList => {
      this.weeklyTaskList = weeklyTaskList;
      this.checkWeeklyTasks();
    }));

    this.weeklyTaskList = this.weeklyTasksService.weeklyTaskListStorage;
    this.checkWeeklyTasks();

    this.unsubscribe.push(this.calendar.dateUpdated.subscribe(()=>{
      console.log(this);
      this.getTasks()
    },()=>{}));

  }

  ngOnDestroy() {
    for (let uns of this.unsubscribe) {
      uns.unsubscribe();
    }
  }

  deleteTask(taskId) {
    for (let idx in this.tasks) {
      if (this.tasks[idx].taskId === taskId) {
        this.tasks.splice(parseInt(idx), 1);
      }
    }
  }

  getTasks() {
  this.loading=true;
    this.tasks = [];
    this.tasksService.getTasks<TaskModel>()
      .subscribe(tasks => {
          this.loading = false;

          let _tasks: TaskModel[] = [];
          for (let task of tasks) {
            _tasks.push(TaskModel.taskModelFromObject(task))
          }
          this.tasks = _tasks;
          this.taskUpdated = true;
          this.checkWeeklyTasks();
        },
        reason => {
          this.loading = false;
          return this.errorHandlers.httpErrorHandler(reason)
        });
  }

  checkWeeklyTasks() {
    const currentWeekDay: string = this.calendar.activeDay.split(' ')[2];
    const taskDay: string = this.calendar.getTaskDay();
    if (this.weeklyTaskList && this.taskUpdated) {
      //фильтрация по дню
      let _wtl: WeeklyTask[] = this.weeklyTaskList
        .filter(value => value.weeklyTaskDay === currentWeekDay);
      //фильтрация по наличию в текущем списке

      for (let _t of this.tasks) {
        _wtl = _wtl
          .filter(value =>
            _t.taskDescription.toLowerCase().indexOf(value.weeklyTaskDescription.toLowerCase()) === -1);
      }

      for (let _wt of _wtl) {
        let newTask = new TaskModel(taskDay);
        newTask.taskDescription = _wt.weeklyTaskDescription;
        this.tasksService.sendAddTaskRequest(newTask);
      }
      if (_wtl.length === 0) {
        //фокус на последнем элементе
        this.tasks[this.tasks.length - 1].focus = true;
      }
    }
  }

}