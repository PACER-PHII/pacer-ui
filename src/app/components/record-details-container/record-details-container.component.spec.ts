import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordDetailsContainerComponent } from './record-details-container.component';

describe('RecordDetailsContainerComponent', () => {
  let component: RecordDetailsContainerComponent;
  let fixture: ComponentFixture<RecordDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordDetailsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
