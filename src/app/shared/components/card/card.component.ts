import { CartService } from './../../../features/cart/service/cart.service';
import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../../core/models/products/iproducts.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe , TitleCasePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() product:IProduct = {} as IProduct;

  private readonly cartService = inject(CartService)

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
