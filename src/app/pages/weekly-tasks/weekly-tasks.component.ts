import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-tasks',
  templateUrl: './weekly-tasks.component.html',
  styleUrls: ['./weekly-tasks.component.sass']
})
export class WeeklyTasksComponent implements OnInit {

  public dayList = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье'
  ];

  constructor() { }

  ngOnInit() {
  }

}
