import { TestBed } from '@angular/core/testing';

import { ConsummerApiService } from './consummer-api.service';

describe('ConsummerApiService', () => {
  let service: ConsummerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsummerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
