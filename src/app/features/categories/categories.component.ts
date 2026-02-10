import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  CategoriesList:WritableSignal<Icategories[]> = signal<Icategories[]>([])

  ngOnInit():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.CategoriesList.set(res.data);
      },
      error:(err)=>{
        console.log(`Error occurred while fetching categories ${err} `);
      }
    })
  }
}
