import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/service/cart.service';


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly fb = inject(FormBuilder);

  private readonly cartService = inject(CartService);

  cartId: string | null = null;

  ngOnInit(): void {
    this.getCartId();
    this.checkoutFormGroup();
  }

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId = urlParams.get('id');
      },
    });
  }

  checkOutForm!: FormGroup;

  checkoutFormGroup(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)],
        city: [null, [Validators.required]],
      }),
    });
  }

  onSubmitCheckout(method: 'visa' | 'cash'): void {
    if (this.checkOutForm.valid && this.cartId) {
      if (method === 'visa') {
        this.cartService.checkOutSession(this.cartId, this.checkOutForm.value).subscribe({
          next: (res) => {
            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (method === 'cash') {
      this.cartService.cashCheckout(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.router.navigate(['/allorders']);
          }
        },
      });
    }
  }
    }
}
