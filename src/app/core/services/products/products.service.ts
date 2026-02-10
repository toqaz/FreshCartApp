import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../../models/products/iproducts.interface';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpclient = inject(HttpClient);

  getAllProducts(page:number=1 , limit:number=10):Observable<ProductResponse> {
    return this.httpclient.get<ProductResponse>(environment.base_url+`products?page=${page}&limit=${limit}`)
}
}
