import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../constants/storedKey';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly router = inject(Router);

  private readonly platformId = inject(PLATFORM_ID);

  iserDataDecoded:any = null;


  sendRegistrationData(userData: IuserData): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signup', userData);
  }
  sendLoginData(userData: IuserData): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signin', userData);
  }

  getUserId():string|null{
    if (!isPlatformBrowser(this.platformId)) {
      return null
    }
    const token =localStorage.getItem(STORED_KEYS.userToken);

    if(!token) {
      return null;
    }

    const decoded = jwtDecode<Itoken>(token)
    return decoded.id
  }

  decodedUserToken() {
    if (localStorage.getItem(STORED_KEYS.userToken)) {
      this.iserDataDecoded = jwtDecode(localStorage.getItem(STORED_KEYS.userToken)!);
      console.log(this.iserDataDecoded ,"user-data");
    }
  }

  userLogout():void{
    localStorage.removeItem(STORED_KEYS.userToken);

    this.router.navigate(['/login']);
  }
}
