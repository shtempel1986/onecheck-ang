let calendarConsts = {
  day: 86400000,
  week: 604800000,
  seasonsNames: [
    'Зима',
    'Весна',
    'Лето',
    'Осень'
  ],
  getWeek: function (date: Date): number {// ПОЛУЧЕНИЕ НОМЕРА НЕДЕЛИ
    let target = new Date(date.getTime());
    let dayNr = (date.getDay() + 6) % 7;
    let year = target.getFullYear();
    target.setDate(target.getDate() - dayNr);
    let firstThursday = target.valueOf();
    let deltaWeek = 1;
    target.setFullYear(year, 0, 1);
    if (target.getDay() !== 1) {
      target.setMonth(0, 1 + ((8 - target.getDay())) % 7);
    }
    return Math.ceil((firstThursday - target.valueOf()) / this.week) + deltaWeek;
  },
  getCurrentWeek ():string {
    let currentWeek = this.getWeek(new Date());
    let currentYear = (new Date()).getFullYear();

    let currentWeekString = currentWeek + ' неделя ' + currentYear;
    return (currentWeekString);
  },
  getTomorrowWeek ():string {
    let tomorrow = new Date(new Date().getTime() + this.day);
    let tomorrowWeek = this.getWeek(tomorrow);
    let tomorrowYear = (new Date()).getFullYear();

    let tomorrowWeekString = tomorrowWeek + ' неделя ' + tomorrowYear;
    return (tomorrowWeekString);
  },
  dayNames: [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота'
  ],
  monthNames: [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
  ],
  getTodaySeasonTitle ():string {
    let todaySeasonTitle: string;
    let now = new Date();
    let season: number;

    season = now.getMonth() + 1;


    if (season === 12) {
      todaySeasonTitle = this.seasonsNames[3] + ' ';
    } else {
      season = Math.floor(season / 3);
      todaySeasonTitle = this.seasonsNames[season] + ' ';
    }
    todaySeasonTitle += now.getFullYear();
    return todaySeasonTitle;
  },
  getTomorrowSeasonTitle ():string {
    let tomorrowSeasonTitle: string;
    let tomorrow = new Date(new Date().getTime() + this.day);
    let season: number;

    season = tomorrow.getMonth() + 1;


    if (season === 12) {
      tomorrowSeasonTitle = this.seasonsNames[3] + ' ';
    } else {
      season = Math.floor(season / 3);
      tomorrowSeasonTitle = this.seasonsNames[season] + ' ';
    }
    tomorrowSeasonTitle += tomorrow.getFullYear();
    return tomorrowSeasonTitle;
  },
  getTodayTitle():string {
    let todayTitle: string;
    let now = new Date();

    todayTitle = now.getDate()+ ' ';
    todayTitle += this.monthNames[now.getMonth()];
    todayTitle += ' ';
    todayTitle += this.dayNames[now.getDay()];

    return todayTitle;
  },
  getTomorrowTitle():string {
    let tomorrowTitle: string;
    let tomorrow = new Date(new Date().getTime() + this.day);

    tomorrowTitle = tomorrow.getDate()+ ' ';
    tomorrowTitle += this.monthNames[tomorrow.getMonth()];
    tomorrowTitle += ' ';
    tomorrowTitle += this.dayNames[tomorrow.getDay()];

    return tomorrowTitle;
  },
  rusMonthToNumber (str):string {
    let _str: string;
    _str = str;

    for(let idx in this.monthNames){
      _str = _str.replace(this.monthNames[idx],idx)
    }

    return _str;
  }
};

export default calendarConsts;
