import calendarConsts from './calendarConsts';

export default class Season {
  public weeksList: Array<string> = [];

  private seasonsNames = calendarConsts.seasonsNames;

  constructor(public seasonTitle: string) {

    let seasonName = seasonTitle.split(' ')[0];

    let year = parseInt(seasonTitle.split(' ')[1]);

    let seasonNumber: number = this.seasonsNames.indexOf(seasonName);

    let seasonStart: Date;

    let seasonEnd: Date;


    switch (seasonNumber) {
      case 0 : {
        seasonStart = new Date(year - 1, 11, 1);
        seasonEnd = new Date(year, 2, 1);
        seasonEnd = new Date(seasonEnd.getTime() - calendarConsts.day);
      }
        break;
      default : {
        seasonStart = new Date(year, seasonNumber * 3 - 1, 1);
        seasonEnd = new Date(year, (seasonNumber + 1) * 3 - 1, 1);
        seasonEnd = new Date(seasonEnd.getTime() - calendarConsts.day);
        break;
      }
    }

    while (seasonStart.getDay() !== 1) {
      seasonStart.setDate(seasonStart.getDate() + 1);
    }

    let weekIncrement: Date = seasonStart;


    while (weekIncrement.getTime() < seasonEnd.getTime()) {
      let weekTitle: string = '';

      weekTitle += calendarConsts.getWeek(weekIncrement);
      weekTitle += ' неделя ';
      weekTitle += weekIncrement.getFullYear();

      this.weeksList.push(weekTitle);
      weekIncrement = new Date(weekIncrement.getTime() + calendarConsts.week);
    }

  }
}