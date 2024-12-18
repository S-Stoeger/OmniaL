import { TestBed } from '@angular/core/testing';

import { EqipmentService } from './eqipment.service';

describe('EqipmentService', () => {
  let service: EqipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EqipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
