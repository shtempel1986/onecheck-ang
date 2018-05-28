export class TaskModel {

  constructor(
    public taskDay: string,
    public taskId?: string ,
    public taskCompleted?: boolean ,
    public taskDescription?: string ,
    public userId?: string
  ) {

  }
}