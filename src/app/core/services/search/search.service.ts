import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchText: WritableSignal<string> = signal('');

  searchResult(text:string){
    this.searchText.set(text)
  }

}
