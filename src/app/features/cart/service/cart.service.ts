import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler';
import { STORED_KEYS } from '../../../core/constants/storedKey';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  myHeaders: object = {
    headers: {
      Token: localStorage.getItem(STORED_KEYS.userToken)!,
    },
  };

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.base_url + 'cart',
      {
        productId: id,
      },
      this.myHeaders,
    );
  }
}
