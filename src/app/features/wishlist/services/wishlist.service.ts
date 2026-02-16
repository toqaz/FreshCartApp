import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Iwishlist } from '../models/iwishlist.interface';
import { WishlistDataResponse } from '../models/wishlist-data.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);

  likedProductId: WritableSignal<string[]> = signal([])

  addProductToWish(productId:string):Observable<Iwishlist>{
    return this.httpClient.post<Iwishlist>(environment.base_url + 'wishlist' , {productId})
  }

  removeProductfromWishlist(productId:string):Observable<any>{
    return this.httpClient.delete<any>(environment.base_url + `wishlist/${productId}`)
  }

  getLoggedUserWishlist():Observable<WishlistDataResponse>{
    return this.httpClient.get<WishlistDataResponse>(environment.base_url + 'wishlist')
  }

  isProductLiked(productId:string):boolean{
    return this.likedProductId().includes(productId)
  }
}
