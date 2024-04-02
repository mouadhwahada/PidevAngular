import { TestBed } from '@angular/core/testing';

import { SubcommentService } from './subcomment.service';

describe('SubcommentService', () => {
  let service: SubcommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
