import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core/models/products/iproducts.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(productList:IProduct[], word:string): IProduct[] {
    return productList.filter((item)=>item.title.toLowerCase().includes(word.toLowerCase()));
  }

}
