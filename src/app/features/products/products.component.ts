import { SearchService } from './../../core/services/search/search.service';
import { PaginationInstance } from './../../../../node_modules/ngx-pagination/lib/pagination-instance.d';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/models/products/iproducts.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);

  private readonly searchService = inject(SearchService);

  searchText = this.searchService.searchText;

  productsList: WritableSignal<IProduct[]> = signal<IProduct[]>([]);

  pagination: PaginationInstance = {
    id: 'products',
    itemsPerPage: 40,
    currentPage: 1,
    totalItems: 0,
  };

  text:string='';

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService
      .getAllProducts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (res) => {
          this.productsList.set(res.data);

          this.pagination.totalItems = res.results;
        },
        error: () => {
          console.log('Error occurred while fetching products');
        },
      });
  }

  pageChanged(page: number): void {
    this.pagination.currentPage = page;
    this.getAllProducts();
  }
}
