import { SearchService } from './../../../core/services/search/search.service';
import { AuthService } from './../../../core/auth/services/authentication/auth.service';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewChild,
  signal,
  Signal,
  computed,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../features/cart/service/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly flowbiteService = inject(FlowbiteService);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  private readonly searchService = inject(SearchService);

  private readonly cartService = inject(CartService);

  @ViewChild('mobileMenu') menu!: ElementRef;
  isOpen: boolean = false;
  menuHeight: number = 0;

  searchtext: string = '';

  count: Signal<number> = computed(() => this.cartService.cartCount());

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.menuHeight = this.menu.nativeElement.scrollHeight;
    } else {
      this.menuHeight = 0;
    }
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if(this.isLogin){
      this.getAllCartData()
    }
  }

  getAllCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartCount.set(res.numOfCartItems)
      }
    })
  }

  signOut(): void {
    this.authService.userLogout();
  }

  onSearch(): void {
    this.searchService.searchResult(this.searchtext);
    this.router.navigate(['/products']);
  }

  get isLogin(): boolean {
    return !!this.authService.getUserId();
  }
}
