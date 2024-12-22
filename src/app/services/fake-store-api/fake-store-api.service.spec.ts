import { TestBed } from '@angular/core/testing';

import { FakeStoreApiService } from './fake-store-api.service';

describe('FakeStoreApiService', () => {
  let service: FakeStoreApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeStoreApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
