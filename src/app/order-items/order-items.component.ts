import { Component } from '@angular/core';
import { OrderItemService } from '../order-item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent {
  constructor(private orderItemService: OrderItemService,private route: ActivatedRoute,private router:Router,) { }




  
}
