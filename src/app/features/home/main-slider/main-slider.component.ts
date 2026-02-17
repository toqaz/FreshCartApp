import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements OnInit {

  private readonly translateService = inject(TranslateService)

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe({
      next:(data)=>{
        this.mainSliderCustom = {
          ...this.mainSliderCustom , rtl :data.lang === 'ar' ? true : false,
        }
      }
    })
  }

  mainSliderCustom: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    rtl: this.translateService.getCurrentLang() === 'ar'? true : false
  }
}
