import { Iorders } from './../../core/models/orders/iorders.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../core/services/orders/order.service';
import { AuthService } from './../../core/auth/services/authentication/auth.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrderService);

  userData: WritableSignal<any> = signal<any>(null);
  ordersList: WritableSignal<Iorders[]> = signal<Iorders[]>([]);
  isLoadingOrders: WritableSignal<boolean> = signal<boolean>(false);
  ordersError: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {
    this.getUserFromToken();
    this.getAllOrders();
  }

  getUserFromToken(): void {
    this.authService.decodedUserToken();
    this.userData.set(this.authService.userDataDecoded);
    console.log('user from token:', this.userData());
  }

  getAllOrders(): void {
    this.isLoadingOrders.set(true);
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.ordersList.set(res);
        this.isLoadingOrders.set(false);
      },
      error: (err) => {
        console.log(err);
        this.ordersError.set(err.error?.message || 'Failed to load orders.');
        this.isLoadingOrders.set(false);
      },
    });
  }
}

