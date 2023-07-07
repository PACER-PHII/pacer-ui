import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiansInfoComponent } from './guardians-info.component';

describe('GuardiansInfoComponent', () => {
  let component: GuardiansInfoComponent;
  let fixture: ComponentFixture<GuardiansInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardiansInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardiansInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
