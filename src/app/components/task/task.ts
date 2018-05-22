
export class Task {
  public userId: number;
  public taskId: number;
  constructor(userId,
              public taskText: string,
              public taskDate: Date,
              public taskDone: boolean = false,
              taskId) {
    (typeof userId === 'string') ? this.userId = parseInt(userId)
      : this.userId = userId;
    (typeof taskId === 'string') ? this.taskId = parseInt(taskId)
      : this.userId = this.taskId;

  }
}