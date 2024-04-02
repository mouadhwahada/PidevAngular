import { TestBed } from '@angular/core/testing';

import { DailyCalorieServiceService } from './daily-calorie-service.service';

describe('DailyCalorieServiceService', () => {
  let service: DailyCalorieServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyCalorieServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
