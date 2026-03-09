import { TestBed } from '@angular/core/testing';

import { FollowerSuggestionsService } from './follower-suggestions.service';

describe('FollowerSuggestionsService', () => {
  let service: FollowerSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowerSuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
