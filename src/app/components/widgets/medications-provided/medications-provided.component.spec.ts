import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsProvidedComponent } from './medications-provided.component';

describe('MedicationsProvidedComponent', () => {
  let component: MedicationsProvidedComponent;
  let fixture: ComponentFixture<MedicationsProvidedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationsProvidedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationsProvidedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
