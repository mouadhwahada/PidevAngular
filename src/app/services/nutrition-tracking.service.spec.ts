import { TestBed } from '@angular/core/testing';

import { NutritionTrackingService } from './nutrition-tracking.service';

describe('NutritionTrackingService', () => {
  let service: NutritionTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
