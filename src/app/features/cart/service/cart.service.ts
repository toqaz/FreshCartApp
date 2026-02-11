import { STORED_KEYS } from './../../../core/constants/storedKey';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  myHeaders: object = {
    headers: {
      token: localStorage.getItem(STORED_KEYS.userToken)!,
    },
  };

  addProductToCart(id: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>(
      environment.base_url + 'cart',
      {
        productId: id,
      },
      this.myHeaders,
    );
  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(environment.base_url + 'cart', this.myHeaders);
  }

  removeProductFromCart(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(
      environment.base_url + `cart/${id}`,
      this.myHeaders,
    );
  }

  updateCartQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(
      environment.base_url + `cart/${id}`,
      {
        count: count,
      },
      this.myHeaders,
    );
  }
}
