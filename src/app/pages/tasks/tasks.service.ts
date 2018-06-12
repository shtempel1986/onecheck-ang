import {Injectable} from '@angular/core';
import {RestDataSource} from "../../models/rest.datasource";
import {AuthCheckService} from "../../auth/auth-check.service";
import {Observable} from "rxjs/Observable";
import {CalendarModel} from "../../models/calendar.model";
import {TaskModel} from "../../components/task/task.model";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs/Subscription";
import {ErrorHandlersService} from "../../services/error-handlers.service";


@Injectable()
export class TasksService {
  private tasksListener: Function;
  private deleteTaskListener: Function;

  constructor(private dataSource: RestDataSource,
              private auth: AuthCheckService,
              private calendar: CalendarModel,
              private errorHandlers: ErrorHandlersService) {
  }

  getTasks<TaskModel>(): Observable<TaskModel[]> {
    const currentUser = this.auth.getCurrentUser();
    const taskDay = this.calendar.getTaskDay();
    return this.dataSource.getData<TaskModel>(`tasks/${currentUser.userId}/${taskDay}`);
  }

  sendCompleteTaskRequest(task: TaskModel): Observable<boolean> {
    const currentUser = this.auth.getCurrentUser();
    const taskDay = this.calendar.getTaskDay();
    return this.dataSource.sendPutRequest(`tasks/${currentUser.userId}/${taskDay}/${task.taskId}/complete`, task.taskCompleted);
  }

  sendTaskDescription(task: TaskModel): Observable<boolean> {
    const currentUser = this.auth.getCurrentUser();
    const taskDay = this.calendar.getTaskDay();
    return this.dataSource.sendPutRequest(`tasks/${currentUser.userId}/${taskDay}/${task.taskId}/description`, task.taskDescription);
  }

  sendAddTaskRequest(task?:TaskModel){
    const currentUser = this.auth.getCurrentUser();
    const taskDay = this.calendar.getTaskDay();
    return this.dataSource.sendPostRequest<TaskModel>(`tasks/${currentUser.userId}/${taskDay}`, task).subscribe(res => {
        const newTask = TaskModel.taskModelFromObject(res);
        newTask.focus = true;
        if(this.tasksListener){
          this.tasksListener(newTask);
        }
      }
      , reason => {
        this.errorHandlers.httpErrorHandler(reason)
      });
  }
  sendDeleteTaskRequest(taskId:string) {
    const currentUser = this.auth.getCurrentUser();
    const taskDay = this.calendar.getTaskDay();
    return this.dataSource.sendDeleteRequest<TaskModel>(`tasks/${currentUser.userId}/${taskDay}/${taskId}`).subscribe(taskId => {
        if(this.deleteTaskListener){
          this.deleteTaskListener(taskId);
        }
      }
      , reason => {
        this.errorHandlers.httpErrorHandler(reason)
      });
  }

  updateTask(tasksListener: Function){
    this.tasksListener = tasksListener;
  }

  deleteTask(deleteTaskListener: Function){
    this.deleteTaskListener = deleteTaskListener;
  }
}
