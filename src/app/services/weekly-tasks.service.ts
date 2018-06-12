import {Injectable} from '@angular/core';
import {RestDataSource} from "../models/rest.datasource";
import {WeeklyTask} from "../models/WeeklyTask";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ErrorHandlersService} from "./error-handlers.service";

@Injectable()
export class WeeklyTasksService {

  public weeklyTaskList: Subject<WeeklyTask[]> = new Subject<WeeklyTask[]>();
  private isUpdated: boolean = false;
  public weeklyTaskListStorage: WeeklyTask[];

  constructor(private dataService: RestDataSource,
              private errorHandlers: ErrorHandlersService) {
  }

  updateWeeklyTasks(userId: string) {
    if (!this.isUpdated) {
      this.dataService.getData(`weeklyTasks/${userId}`).subscribe(weeklyTaskList => {
          this.weeklyTaskList.next(weeklyTaskList);
          this.isUpdated = true;
          this.weeklyTaskListStorage = weeklyTaskList;
        },
        reason => {
          this.errorHandlers.httpErrorHandler(reason)
        });
    }
  }

  getWeeklyTaskList(): Observable<WeeklyTask[]> {
    return this.weeklyTaskList.asObservable();
  }

  postWeeklyTask(weeklyTask: WeeklyTask) {
    let r = this.dataService.sendPostRequest(`weeklyTasks/${weeklyTask.userId}`, weeklyTask);
    // r.pipe(res=>{
    //   console.log(res.subscribe(val=>{},
    //     error1 =>{
    //       console.log(error1);
    //     }));
    //   return res;
    // });
    return r.subscribe(weeklyTaskId => {
      weeklyTask.weeklyTaskId = weeklyTaskId;
      this.weeklyTaskListStorage.push(weeklyTask);
      this.weeklyTaskList.next(this.weeklyTaskListStorage);
    });
  }

  deleteWeeklyTaskById(userId: string, weeklyTaskId: string) {
    let r = this.dataService.sendDeleteRequest(`weeklyTasks/${userId}/${weeklyTaskId}`);

    return r.subscribe(result => {
        this.weeklyTaskListStorage =
          this.weeklyTaskListStorage
            .filter(value => value.weeklyTaskId !== weeklyTaskId);
        this.weeklyTaskList.next(this.weeklyTaskListStorage);

      },
      reason => {
        this.errorHandlers.httpErrorHandler(reason)
      });
  }

  changeWeeklyTaskDescription(weeklyTask: WeeklyTask): Observable<any> {
    return this.dataService
      .sendPatchRequest(
        `weeklyTasks/${weeklyTask.userId}/${weeklyTask.weeklyTaskId}/description`,
        weeklyTask.weeklyTaskDescription);
  }

}
