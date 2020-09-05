import { TestBed } from '@angular/core/testing';

import { InfluencerServiceService } from './influencer-service.service';

describe('InfluencerServiceService', () => {
  let service: InfluencerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfluencerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
