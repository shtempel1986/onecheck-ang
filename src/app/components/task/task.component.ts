import {Component} from "@angular/core"

@Component({
  selector: 'task-component',
  templateUrl: 'task.component.html',
  styleUrls: ['task.component.sass']
})
export class TaskComponent {
  public userId: number;
  public taskId: number;
  constructor(userId,
              public taskText: string,
              public taskDate: Date,
              public taskDone: boolean = false,
              taskId) {
    (typeof userId === 'string') ? this.userId = parseInt(userId)
      : this.userId = userId;
    (typeof this.taskId === 'string') ? this.taskId = parseInt(taskId)
      : this.userId = this.taskId;

  }
}