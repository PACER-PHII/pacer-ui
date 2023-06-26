import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDetailsTableComponent } from './record-details-table.component';

describe('RecordDetailsTableComponent', () => {
  let component: RecordDetailsTableComponent;
  let fixture: ComponentFixture<RecordDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordDetailsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
