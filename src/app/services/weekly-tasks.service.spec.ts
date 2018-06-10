import { TestBed, inject } from '@angular/core/testing';

import { WeeklyTasksService } from './weekly-tasks.service';

describe('WeeklyTasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeeklyTasksService]
    });
  });

  it('should be created', inject([WeeklyTasksService], (service: WeeklyTasksService) => {
    expect(service).toBeTruthy();
  }));
});
