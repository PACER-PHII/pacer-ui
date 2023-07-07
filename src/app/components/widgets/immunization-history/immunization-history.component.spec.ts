import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmunizationHistoryComponent } from './immunization-history.component';

describe('ImmunizationHistoryComponent', () => {
  let component: ImmunizationHistoryComponent;
  let fixture: ComponentFixture<ImmunizationHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmunizationHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmunizationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
