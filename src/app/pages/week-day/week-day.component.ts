import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WeeklyTask} from "../../models/WeeklyTask";
import {WeeklyTasksService} from "../../services/weekly-tasks.service";
import {AuthCheckService} from "../../auth/auth-check.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-week-day',
  templateUrl: './week-day.component.html',
  styleUrls: ['./week-day.component.sass']
})
export class WeekDayComponent implements OnInit, OnDestroy {
  public currentWeekDay: string;
  public weeklyTaskList: Array<WeeklyTask>;
  public unsubscribe: Array<Subscription> = [];

  constructor(private activeRouter: ActivatedRoute,
              private weeklyTasksService: WeeklyTasksService,
              private authCheck: AuthCheckService) {
  }

  ngOnInit() {
    this.currentWeekDay = this.activeRouter.snapshot.params.day;
    console.log(this.activeRouter.snapshot.params);
    this.unsubscribe.push(this.weeklyTasksService.getWeeklyTaskList().subscribe(weeklyTaskList => {

      this.weeklyTaskList = weeklyTaskList.filter(value => {
        return value.weeklyTaskDay === this.currentWeekDay;
      });
    }));

    if (this.weeklyTasksService.weeklyTaskListStorage) {
      this.weeklyTaskList = this.weeklyTasksService.weeklyTaskListStorage.filter(value => {
        return value.weeklyTaskDay === this.currentWeekDay;
      });
    }
  }

  ngOnDestroy(){
    for(let uns of this.unsubscribe){
      uns.unsubscribe();
    }
  }

  addWeeklyTask() {
    const newWeeklyTask = new WeeklyTask(this.currentWeekDay,
      this.authCheck.getCurrentUser().userId);

    this.weeklyTasksService.postWeeklyTask(newWeeklyTask);
  }

}
