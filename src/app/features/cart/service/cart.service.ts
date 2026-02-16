import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  cartCount: WritableSignal<number> = signal<number>(0);

  addProductToCart(id: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>(environment.base_url + 'cart', {
      productId: id,
    });
  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(environment.base_url + 'cart');
  }

  removeProductFromCart(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(environment.base_url + `cart/${id}`);
  }

  updateCartQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(environment.base_url + `cart/${id}`, {
      count: count,
    });
  }
  ClearAllCart(): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(environment.base_url + 'cart');
  }

  checkOutSession(cartId: string | null, checkoutData: object): Observable<PaymentDetailsResponse> {
    return this.httpClient.post<PaymentDetailsResponse>(
      environment.base_url + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkoutData,
    );
  }

  cashCheckout(cartId: string | null, orderData: object): Observable<CashPaymentResponse> {
    return this.httpClient.post<CashPaymentResponse>(
      environment.base_url + `orders/${cartId}`,
      orderData,
    );
  }
}
