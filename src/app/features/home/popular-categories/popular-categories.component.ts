import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesServices = inject(CategoriesService);

  categoriesList: WritableSignal<Icategories[]> = signal<Icategories[]>([]);

   private readonly translateService = inject(TranslateService)


  ngOnInit(): void {
    this.getAllCategoriesData();
    this.translateService.onLangChange.subscribe({
      next:(data)=>{
        this.categoriesCustomOptions = {
          ...this.categoriesCustomOptions , rtl :data.lang === 'ar' ? true : false,
        }
      }
    })
  }
  getAllCategoriesData(): void {
    this.categoriesServices.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  categoriesCustomOptions: OwlOptions = {
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
