import calendarConsts from './calendarConsts';

const WEEK = calendarConsts.week;
const DAY = calendarConsts.day;
const DAYNAMES = calendarConsts.dayNames;
const MONTHNANES = calendarConsts.monthNames;

export default class Week {
  public daysList: Array<string> = [];

  private weekStart: Date;
  private weekEnd: Date;

  constructor(public weekTitle: string) {
    let parsedTitle = weekTitle.split(' ');
    let weekNumber = parseInt(parsedTitle[0]);
    let weekYear = parseInt(parsedTitle[2]);
    let firstWeekStart = new Date();
    firstWeekStart.setFullYear(weekYear, 0, 1);
    while (firstWeekStart.getDay() !== 1) {
      firstWeekStart.setTime(firstWeekStart.getTime() + DAY);
    }
    firstWeekStart.setTime(firstWeekStart.getTime() + WEEK * (weekNumber - 1));
    this.weekStart = new Date(firstWeekStart);
    firstWeekStart.setTime(firstWeekStart.getTime() + 6 * DAY);
    this.weekEnd = new Date(firstWeekStart);
    this.settingDysList();
  }
  private settingDysList(){
    let weekStart = this.weekStart.getTime();
    let weekEnd = this.weekEnd.getTime();

    let deltaDay = new Date(weekStart);

    while (deltaDay.getTime() <= weekEnd){
      let dayTitle : string = '';

      dayTitle += deltaDay.getDate();
      dayTitle += ' ';
      dayTitle += MONTHNANES[deltaDay.getMonth()];
      dayTitle += ' ';
      dayTitle += DAYNAMES[deltaDay.getDay()];

      this.daysList.push(dayTitle);

      deltaDay.setTime(deltaDay.getTime() + DAY);
    }
  }
}