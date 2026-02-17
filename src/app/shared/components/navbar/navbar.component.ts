import { SearchService } from './../../../core/services/search/search.service';
import { AuthService } from './../../../core/auth/services/authentication/auth.service';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
  Signal,
  computed,
  HostListener,
  OnDestroy,
  ChangeDetectorRef,
  Renderer2,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../features/cart/service/cart.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

export interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private langSub!: Subscription;
  private readonly renderer = inject(Renderer2);


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
    if (this.isLogin) {
      this.getAllCartData();
    }
    this.langSub = this.translateService.onLangChange.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  getAllCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
    });
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

  @ViewChild('dropdownRef', { static: true }) dropdownRef!: ElementRef<HTMLElement>;

  private readonly translateService = inject(TranslateService);

  isOpened = false;

  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
  ];

  selected: Language =
    this.languages.find((l) => l.code === this.translateService.getCurrentLang()) ??
    this.languages[0];
  // ── Close on outside click ─────────────────────────────────────────────────
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.dropdownRef.nativeElement.contains(event.target as Node)) {
      this.isOpened = false;
    }
  }

  selectLanguage(lang: Language): void {
    this.selected = lang;
    this.isOpened = false;
    this.translateService.use(lang.code);

    document.documentElement.dir = lang.code === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang.code;
    this.renderer.setAttribute(document.documentElement,'lang',this.selected.code)
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.isOpened = false;
  }

  // ── Methods ────────────────────────────────────────────────────────────────
  toggleDropdown(): void {
    this.isOpened = !this.isOpened;
  }

  ngOnDestroy(): void {
    this.langSub?.unsubscribe(); // 👈 clean up
  }
}
