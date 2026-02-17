import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './../products/services/productDetails/product-details.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../wishlist/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/service/cart.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-details',
  imports: [NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly ProductDetailsService = inject(ProductDetailsService);

  private readonly wishlistService = inject(WishlistService);

  private readonly toasterService = inject(ToastrService);

  private readonly cartService = inject(CartService)

    get liked():boolean{
      return this.wishlistService.isProductLiked(this.productDetailsData()._id);
    }


  productId: string | null = null;

productDetailsData:WritableSignal<IproductDetails> = signal<IproductDetails>({} as IproductDetails)


  ngOnInit(): void {
    this.gerProductId();
    this.getSpecificProductData();
  }

  getSpecificProductData(): void {
    this.ProductDetailsService.getSpecificProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetailsData.set(res.data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  gerProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.productId = urlParams.get('id');
      },
    });
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
      this.wishlistService.addProductToWish(this.productDetailsData()._id).subscribe({
        next:(res)=>{
          if(res.status === 'success'){
            const currentLiked = this.wishlistService.likedProductId();
            this.wishlistService.likedProductId.set([...currentLiked, this.productDetailsData()._id])
            this.toasterService.success('Added to wishlist')
          }
        }
      });
    } else {
      this.wishlistService.removeProductfromWishlist(this.productDetailsData()._id).subscribe({
        next:()=>{
          const currentLiked = this.wishlistService.likedProductId();
          this.wishlistService.likedProductId.set(currentLiked.filter(id=> id !== this.productDetailsData()._id))
          this.toasterService.success('Removed from wishlist')
        }
      })
    }

    }
}
