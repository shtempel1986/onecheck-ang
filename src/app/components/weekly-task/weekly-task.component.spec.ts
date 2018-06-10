import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTaskComponent } from './weekly-task.component';

describe('WeeklyTaskComponent', () => {
  let component: WeeklyTaskComponent;
  let fixture: ComponentFixture<WeeklyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
