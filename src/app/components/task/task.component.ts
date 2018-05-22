import {Component, Input} from "@angular/core"
import {Task} from "./task";

@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent {
  @Input()task: Task;
}