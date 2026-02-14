import { error } from 'console';
import { OrderService } from './../../core/services/orders/order.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/auth/services/authentication/auth.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit {
  private readonly orderService = inject(OrderService);

  ordersList: WritableSignal<Iorders[]> = signal<Iorders[]>([]);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.ordersList.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
