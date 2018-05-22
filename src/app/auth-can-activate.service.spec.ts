import { TestBed, inject } from '@angular/core/testing';

import { AuthCanActivateService } from './auth-can-activate.service';

describe('AuthCanActivateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCanActivateService]
    });
  });

  it('should be created', inject([AuthCanActivateService], (service: AuthCanActivateService) => {
    expect(service).toBeTruthy();
  }));
});
