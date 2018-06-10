import {Component, Input, OnInit} from '@angular/core';
import {WeeklyTask} from "../../models/WeeklyTask";
import {WeeklyTasksService} from "../../services/weekly-tasks.service";

@Component({
  selector: 'app-weekly-task',
  templateUrl: './weekly-task.component.html',
  styleUrls: ['./weekly-task.component.sass']
})
export class WeeklyTaskComponent implements OnInit {
  @Input()
  weeklyTask: WeeklyTask;
  private oldDescription: string;
  constructor(private weeklyTasksService: WeeklyTasksService) { }

  ngOnInit() {
    this.oldDescription = this.weeklyTask.weeklyTaskDescription;
  }

  deleteWeeklyTask(){
    this.weeklyTasksService.deleteWeeklyTaskById(this.weeklyTask.userId, this.weeklyTask.weeklyTaskId);
  }

  changeDescription(){
    if(this.weeklyTask.weeklyTaskDescription !== this.oldDescription){
      this.weeklyTasksService.changeWeeklyTaskDescription(this.weeklyTask).subscribe(value => {
        this.oldDescription = this.weeklyTask.weeklyTaskDescription;
      });
    }
  }

}
