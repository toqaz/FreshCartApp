import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './../products/services/productDetails/product-details.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';


@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly ProductDetailsService = inject(ProductDetailsService);

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
}
