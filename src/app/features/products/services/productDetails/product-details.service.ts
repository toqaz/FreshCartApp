import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  private readonly httpClient = inject(HttpClient);

  getSpecificProduct(id:string|null): Observable<ProductDetailsResponse>{
    return this.httpClient.get<ProductDetailsResponse>(environment.base_url + `products/${id}`)
  }

}
