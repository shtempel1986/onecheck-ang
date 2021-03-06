import {Injectable} from "@angular/core"
import calendarConsts from './calendarConsts';
import Season from './Season';
import Week from './Week';
import {Router} from "@angular/router";
import {TasksComponent} from "../pages/tasks/tasks.component";
import {Observable} from "rxjs/Observable";


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
  private activeDayInDate: Date;

  public todaySeasonTitle: string = calendarConsts.getTodaySeasonTitle();
  public todayWeekTitle: string = calendarConsts.getCurrentWeek();
  public todayTitle: string = calendarConsts.getTodayTitle();
  public dateUpdated: Observable<null>;
  private dateUpdateNext: Function;

  constructor() {

    this.today = new Date();

    this.dateUpdated = new Observable<null>((observer) => {
      this.dateUpdateNext = function () {
        observer.next()
      };
    });

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

  setTodayActiveDay() {
    this.activeSeason = new Season(calendarConsts.getTodaySeasonTitle());
    this.activeWeek = new Week(calendarConsts.getCurrentWeek());
    this.activeDay = calendarConsts.getTodayTitle();
    if (this.dateUpdateNext) {
      this.dateUpdateNext();
    }
  }

  setTomorrowActiveDay() {
    this.activeSeason = new Season(calendarConsts.getTomorrowSeasonTitle());
    this.activeWeek = new Week(calendarConsts.getTomorrowWeek());
    this.activeDay = calendarConsts.getTomorrowTitle();
    if (this.dateUpdateNext) {
      this.dateUpdateNext();
    }
  }

  getTaskDay(): string {
    let lastSpace;

    let taskDay = this.getActiveDate().getFullYear() + '';

    lastSpace = this.activeDay.lastIndexOf(' ');

    let _str = this.activeDay.substring(0, lastSpace);

    taskDay += '_';

    _str = calendarConsts.rusMonthToNumber(_str);

    taskDay += _str;
    taskDay = taskDay.replace(' ', '_');
    return taskDay;
  }

  getActiveDate() {
    let activeDate = new Date(this.activeWeek.weekStart);

    let numberInWeek: number = 0;

    this.activeWeek.daysList.map((el, idx) => {
      if (this.activeDay === el) {
        numberInWeek = idx;
      }
    });

    activeDate.setTime(activeDate.getTime() + numberInWeek * calendarConsts.day);

    return activeDate;
  }

}