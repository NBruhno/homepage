import { TestBed, inject } from '@angular/core/testing';

import { PermService } from './perm.service';

describe('PermService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermService]
    });
  });

  it('should be created', inject([PermService], (service: PermService) => {
    expect(service).toBeTruthy();
  }));
});
