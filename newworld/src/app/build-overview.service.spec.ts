import { TestBed } from '@angular/core/testing';

import { BuildOverviewService } from './build-overview.service';

describe('BuildOverviewService', () => {
  let service: BuildOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
