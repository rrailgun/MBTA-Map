import { TestBed } from '@angular/core/testing';

import { FilterRequestService } from './filter-requests.service';

describe('FilterRequestsService', () => {
  let service: FilterRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
