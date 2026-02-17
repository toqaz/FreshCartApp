import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../core/models/products/iproducts.interface';
import { CardComponent } from "../../../shared/components/card/card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-popular-products',
  imports: [CardComponent,CarouselModule],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit{
  private readonly productsService = inject(ProductsService)

  private readonly translateService = inject(TranslateService)


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
    this.translateService.onLangChange.subscribe({
      next:(data)=>{
        this.productsCustomOptions = {
          ...this.productsCustomOptions , rtl :data.lang === 'ar' ? true : false,
        }
      }
    })
  }

  productsCustomOptions: OwlOptions = {
    loop: true,
    margin: 24,
    stagePadding: 40,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['⬅', '➡'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100:{
        items: 5
      },
      1280:{
        items: 6
      }
    },
    nav: true,
    rtl: this.translateService.getCurrentLang() === 'ar'? true : false
  }

}
