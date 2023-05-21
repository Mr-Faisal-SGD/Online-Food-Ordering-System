import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'orders-item-list',
  templateUrl: './orders-item-list.component.html',
  styleUrls: ['./orders-item-list.component.css']
})
export class OrdersItemListComponent {

  @Input() order!: Order;

}
