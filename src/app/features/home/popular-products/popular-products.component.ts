import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../core/models/products/iproducts.interface';
import { CardComponent } from "../../../shared/components/card/card.component";

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit{
  private readonly productsService = inject(ProductsService)


  productsList:WritableSignal<IProduct[]> = signal<IProduct[]>([])

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.productsList.set(res.data);
      },
      error:()=>{
        console.log('Error occurred while fetching products');
      }
    })
  }
}
