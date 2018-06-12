import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild
} from "@angular/core"
import {TaskModel} from "./task.model";
import {TasksService} from "../../pages/tasks/tasks.service";
import {ErrorHandlersService} from "../../services/error-handlers.service";


@Component({
  selector: 'task-component',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit {

  @Input()
  taskModel: TaskModel;

  @ViewChild('textarea')
  private textarea: ElementRef;

  public updateInProgress: boolean;
  private oldDescription: string;


  constructor(private tasksService: TasksService,
              private errorHandlers: ErrorHandlersService) {
  }

  ngOnInit() {
    this.oldDescription = this.taskModel.taskDescription;
    if (this.taskModel.focus) {
      setTimeout(() => {
        this.textarea.nativeElement.focus();
      }, 10);
      this.taskModel.focus = false;
    }
  }

  completeTask() {
    this.updateInProgress = true;
    this.tasksService.sendCompleteTaskRequest(this.taskModel).subscribe(() => {
        this.updateInProgress = false;
      },
      reason => {
        this.updateInProgress = false;
        this.taskModel.taskCompleted = !this.taskModel.taskCompleted;
        this.errorHandlers.httpErrorHandler(reason)
      });
  }

  changeDescription() {
    if (this.taskModel.taskDescription !== this.oldDescription) {
      this.updateInProgress = true;
      this.tasksService.sendTaskDescription(this.taskModel).subscribe((res) => {
          this.updateInProgress = false;
          this.oldDescription = this.taskModel.taskDescription;
        },
        reason => {
          this.updateInProgress = false;
          this.taskModel.taskCompleted = !this.taskModel.taskCompleted;
          this.taskModel.taskDescription = this.oldDescription;
          this.errorHandlers.httpErrorHandler(reason)
        });
    }
  }

  keyDownHandler(e) {
    switch (e.keyCode) {
      case 13: {
        e.preventDefault();
        this.tasksService.sendAddTaskRequest();
      }
        break;

      case 8: {
        if (this.taskModel.taskDescription.length === 0) {
          this.tasksService.sendDeleteTaskRequest(this.taskModel.taskId);
        }
      }
        break;
    }
  }
}

let i = 0;