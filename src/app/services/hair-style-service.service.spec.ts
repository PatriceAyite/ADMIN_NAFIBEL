import { TestBed } from '@angular/core/testing';

import { HairStyleServiceService } from './hair-style-service.service';

describe('HairStyleServiceService', () => {
  let service: HairStyleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HairStyleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
