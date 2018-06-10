export class WeeklyTask {
  public weeklyTaskId: string = '';
  public weeklyTaskDescription: string = '';
  constructor(public weeklyTaskDay: string,
              public userId: string){

  }
}