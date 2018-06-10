import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTasksComponent } from './weekly-tasks.component';

describe('WeeklyTasksComponent', () => {
  let component: WeeklyTasksComponent;
  let fixture: ComponentFixture<WeeklyTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
