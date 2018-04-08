let calendarConsts = {
  day: 86400000,
  week:604800000,
  seasonsNames : [
    'Зима',
    'Весна',
    'Лето',
    'Осень'
  ],
  getWeek:function (date:Date):number {// ПОЛУЧЕНИЕ НОМЕРА НЕДЕЛИ
    let target = new Date(date.getTime());
    let dayNr = (date.getDay() + 6) % 7;
    let year = target.getFullYear();
    target.setDate(target.getDate() - dayNr);
    let firstThursday = target.valueOf();
    let deltaWeek = 1;
    target.setFullYear(year,0, 1);
    if (target.getDay() !== 1) {
      target.setMonth(0, 1 + ((8 - target.getDay())) % 7);
    }
    console.log(date,new Date(firstThursday));
    console.log(target);
    return Math.ceil((firstThursday - target.valueOf()) / this.week) + deltaWeek;
  }
};

export default calendarConsts;
