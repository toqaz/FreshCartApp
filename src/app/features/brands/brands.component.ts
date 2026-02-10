import { BrandsService } from './../../core/services/brands/brands.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);

  brandsList:WritableSignal<Ibrands[]> = signal<Ibrands[]>([])

  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandsList.set(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
