import { TestBed } from '@angular/core/testing';

import { MBTAApiService } from './mbta-api.service';

describe('MbtaApiService', () => {
  let service: MBTAApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MBTAApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
