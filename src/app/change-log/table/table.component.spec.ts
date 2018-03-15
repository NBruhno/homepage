import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLogTableComponent } from './table.component';

describe('ChangeLogTableComponent', () => {
    let component: ChangeLogTableComponent;
    let fixture: ComponentFixture<ChangeLogTableComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ChangeLogTableComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeLogTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
