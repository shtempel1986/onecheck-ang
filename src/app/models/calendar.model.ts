import {Injectable} from "@angular/core"
import calendarConsts from './calendarConsts';
import Season from './Season';
import Week from './Week';


/* =======================================================
* МОДЕЛЬ ДЛЯ РАБОТЫ С ДАТАМИ НЕДЕЛЯМИ СЕЗОНАМИ КАЛЕНДАРЯ =
* ========================================================
* */
@Injectable()
export class CalendarModel {

  private today: Date;
  private seasonsNames = calendarConsts.seasonsNames;

  public activeSeason: Season = new Season(calendarConsts.getTodaySeasonTitle());
  public activeWeek: Week = new Week(calendarConsts.getCurrentWeek());
  public activeDay: string = calendarConsts.getTodayTitle();

  public todaySeasonTitle: string = calendarConsts.getTodaySeasonTitle();
  public todayWeekTitle: string = calendarConsts.getCurrentWeek();
  public todayTitle: string = calendarConsts.getTodayTitle();

  constructor() {

    this.today = new Date();

  }

  getSeasonList(): Array<string> {

    let seasonList = [];
    let year = this.today.getFullYear();

    while (seasonList.length < 8) {
      let deltaYear = year + Math.floor(seasonList.length / 4);
      seasonList.push(this.seasonsNames[seasonList.length % 4] + ' ' + deltaYear);
    }
    return seasonList;
  }

  setActiveSeason(seasonTitle: string) {
    this.activeSeason = new Season(seasonTitle);
  }

  getWeeksList() {
    return this.activeSeason.weeksList;
  }

  setActiveWeek(weekTitle: string) {
    this.activeWeek = new Week(weekTitle);
  }

  setActiveDay(dayTitle: string) {
    this.activeDay = dayTitle;
  }

  getTaskDay(): string {
    let lastSpace = this.activeWeek.weekTitle.lastIndexOf(' ');

    let taskDay = this.activeWeek.weekTitle.substr(lastSpace + 1);

    lastSpace = this.activeDay.lastIndexOf(' ');

    let _str = this.activeDay.substring(0, lastSpace);

    taskDay += '_';

    _str = calendarConsts.rusMonthToNumber(_str);

    taskDay += _str;
    taskDay = taskDay.replace(' ', '_');
    return taskDay;
  }
}