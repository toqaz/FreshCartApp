import { CartService } from './../../../features/cart/service/cart.service';
import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../core/models/products/iproducts.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/services/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe, TitleCasePipe, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product:IProduct = {} as IProduct;

  private readonly cartService = inject(CartService)
  private readonly toasterService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService);

  get liked():boolean{
    return this.wishlistService.isProductLiked(this.product._id);
  }

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.cartService.cartCount.set(res.numOfCartItems)
          this.toasterService.success(res.message , 'Fresh Cart')
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  toggleWishlist(event:MouseEvent): void {
    event.stopPropagation()
    event.preventDefault();
    if(!this.liked){
      this.wishlistService.addProductToWish(this.product._id).subscribe({
        next:(res)=>{
          if(res.status === 'success'){
            const currentLiked = this.wishlistService.likedProductId();
            this.wishlistService.likedProductId.set([...currentLiked, this.product._id])
            this.toasterService.success('Added to wishlist')
          }
        }
      });
    } else {
      this.wishlistService.removeProductfromWishlist(this.product._id).subscribe({
        next:()=>{
          const currentLiked = this.wishlistService.likedProductId();
          this.wishlistService.likedProductId.set(currentLiked.filter(id=> id !== this.product._id))
          this.toasterService.success('Removed from wishlist')
        }
      })
    }

    }
}
