import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationExchangeComponent } from './reservation-exchange.component';

describe('ReservationExchangeComponent', () => {
  let component: ReservationExchangeComponent;
  let fixture: ComponentFixture<ReservationExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationExchangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
