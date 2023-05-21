import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersItemListComponent } from './orders-item-list.component';

describe('OrdersItemListComponent', () => {
  let component: OrdersItemListComponent;
  let fixture: ComponentFixture<OrdersItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
