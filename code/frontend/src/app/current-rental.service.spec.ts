import { TestBed } from '@angular/core/testing';

import { CurrentRentalService } from './current-rental.service';

describe('CurrentRentalService', () => {
  let service: CurrentRentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentRentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
