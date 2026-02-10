import { SearchService } from './../../../core/services/search/search.service';
import { AuthService } from './../../../core/auth/services/authentication/auth.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input({ required: true }) isLogin: boolean = false;

  private readonly flowbiteService = inject(FlowbiteService);

  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  private readonly searchService = inject(SearchService);

  searchtext: string = '';

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  signOut(): void {
    this.authService.userLogout();
  }

  onSearch(): void {
    this.searchService.searchResult(this.searchtext);
    this.router.navigate(['/products']);
  }
}
