import { TestBed, async, inject } from '@angular/core/testing';

import { PermGuard } from './perm.guard';

describe('PermGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermGuard]
    });
  });

  it('should ...', inject([PermGuard], (guard: PermGuard) => {
    expect(guard).toBeTruthy();
  }));
});
