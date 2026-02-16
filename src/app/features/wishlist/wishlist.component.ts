import { ToastrService } from 'ngx-toastr';
import { IProduct, ProductResponse } from './../../core/models/products/iproducts.interface';
import { WishlistItem } from './models/wishlist-data.interface';
import { WishlistService } from './services/wishlist.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../cart/service/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly toasterService = inject(ToastrService)
  private readonly cartService = inject(CartService)

  wishlistDetailsData: WritableSignal<WishlistItem[]> = signal([]);

  ngOnInit(): void {
    this.getUserWishList();
  }

  getUserWishList(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishlistDetailsData.set(res.data);
          const likedIds = res.data.map((item) => item._id);
          this.wishlistService.likedProductId.set(likedIds);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromWishlist(productId:string):void{
    this.wishlistService.removeProductfromWishlist(productId).subscribe({
      next:()=>{
        const updateList = this.wishlistDetailsData().filter(item=>item._id !== productId)
        this.wishlistDetailsData.set(updateList)

        const currentLiked = this.wishlistService.likedProductId()
        this.wishlistService.likedProductId.set(currentLiked.filter(id=>id !== productId))
      },
      error:(err)=>{
        console.log(err);
      }
    })
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

}
