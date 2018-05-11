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
  getCurrentWeek: function () {
    let currentWeek = this.getWeek(new Date());
    let currentYear = (new Date()).getFullYear();

    let currentWeekString = currentWeek + ' неделя ' + currentYear;
    return (currentWeekString);
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
  getTodaySeasonTitle: function () {
    let todaySeasonTitle: string;
    let now = new Date();
    let season: number;

    season = now.getMonth();

    if (season === 12) {
      todaySeasonTitle = this.seasonsNames[3] + ' ';
    } else {
      season = Math.floor(season / 3);
      todaySeasonTitle = this.seasonsNames[season] + ' ';
    }
    todaySeasonTitle += now.getFullYear();
    return todaySeasonTitle;
  },
  getTodayTitle():string {
    let todayTitle: string;
    let now = new Date();

    todayTitle = now.getDate()+ ' ';
    todayTitle += this.monthNames[now.getMonth()];
    todayTitle += ' ';
    todayTitle += this.dayNames[now.getDay()];

    return todayTitle;
  }
};

export default calendarConsts;
