import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../auth/services/authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly httpClient = inject(HttpClient);

  private readonly authService = inject(AuthService);

  getUserOrders(): Observable<Iorders[]> {
    const userId = this.authService.getUserId();
    return this.httpClient.get<Iorders[]>(environment.base_url + `orders/user/${userId}`);
  }
}
