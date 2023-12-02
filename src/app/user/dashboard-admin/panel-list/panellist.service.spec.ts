import { TestBed } from '@angular/core/testing';

import { PanellistService } from './panellist.service';

describe('PanellistService', () => {
  let service: PanellistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanellistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
