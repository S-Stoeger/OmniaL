import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountSettingsComponent } from './amount-settings.component';

describe('AmountSettingsComponent', () => {
  let component: AmountSettingsComponent;
  let fixture: ComponentFixture<AmountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmountSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
