import { TestBed, inject } from '@angular/core/testing';

import { IDService } from './id.service';

describe('IDService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [IDService]
        });
    });

    it(
        'should be created',
        inject([IDService], (service: IDService) => {
            expect(service).toBeTruthy();
        })
    );
});
