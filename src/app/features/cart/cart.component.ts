import { CurrencyPipe } from '@angular/common';
import { CartService } from './service/cart.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetailsData: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails);

  ngOnInit(): void {
    this.getUserCartData();
  }

  getUserCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItemFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProductQuantity(id: string, count: number): void {
    this.cartService.updateCartQuantity(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cartDetailsData.set(res.data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ClearCartItems(): void {
    this.cartService.ClearAllCart().subscribe({
      next: ()=>{
        this.getUserCartData()
      },
      error: (err) => {
        console.log(err);
      },
    });
    // console.log('clicked');
  }
}
