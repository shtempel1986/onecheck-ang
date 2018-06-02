export class TaskModel {
  public taskCompleted: boolean = false;
  public taskDay: string;
  public focus: boolean = false;

  constructor(
    taskDay: string,
    public taskId?: string,
    taskCompleted?,
    public taskDescription?: string,
    public userId?: string
  ) {
    if (typeof taskCompleted === 'string') {
      this.taskCompleted = taskCompleted != '0';
    } else {
      this.taskCompleted = taskCompleted;
    }
  }

  static taskModelFromObject(taskData: TaskModel) {
    return new TaskModel(taskData.taskDay,
      taskData.taskId,
      taskData.taskCompleted,
      taskData.taskDescription,
      taskData.userId
    );
  }

}