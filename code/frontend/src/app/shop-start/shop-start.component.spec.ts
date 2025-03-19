import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStartComponent } from './shop-start.component';

describe('ShopStartComponent', () => {
  let component: ShopStartComponent;
  let fixture: ComponentFixture<ShopStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
