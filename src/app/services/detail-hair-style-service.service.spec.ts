import { TestBed } from '@angular/core/testing';

import { DetailHairStyleServiceService } from './detail-hair-style-service.service';

describe('DetailHairStyleServiceService', () => {
  let service: DetailHairStyleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailHairStyleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
