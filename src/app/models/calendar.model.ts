import {Injectable} from "@angular/core"
import calendarConsts from './calendarConsts';
import Season from './Season';


/* =======================================================
* МОДЕЛЬ ДЛЯ РАБОТЫ С ДАТАМИ НЕДЕЛЯМИ СЕЗОНАМИ КАЛЕНДАРЯ =
* ========================================================
* */
@Injectable()
export class CalendarModel {

  private today: Date;
  private seasonsNames = calendarConsts.seasonsNames;

  public activeSeason: Season = new Season('Зима 2018');

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

  setActiveSeason(seasonTitle: string){
    this.activeSeason = new Season(seasonTitle);
  }
}