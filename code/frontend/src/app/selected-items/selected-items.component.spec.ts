import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemsComponent } from './selected-items.component';

describe('SelectedItemsComponent', () => {
  let component: SelectedItemsComponent;
  let fixture: ComponentFixture<SelectedItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
