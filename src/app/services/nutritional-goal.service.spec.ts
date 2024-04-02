import { TestBed } from '@angular/core/testing';

import { NutritionalGoalService } from './nutritional-goal.service';

describe('NutritionalGoalService', () => {
  let service: NutritionalGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionalGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
