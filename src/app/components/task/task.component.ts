import {Component, Input} from "@angular/core"
import {TaskModel} from "./task.model";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent {
  @Input()task: TaskModel;
}