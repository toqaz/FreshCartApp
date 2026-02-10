import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { LoginComponent } from './core/auth/login/login.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { DetailsComponent } from './features/details/details.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout',
      },
      {
        path: 'details/:slug/:id',
        component: DetailsComponent,
        title: 'Details',
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Error',
  },
];
