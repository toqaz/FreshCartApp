import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../constants/storedKey';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly router = inject(Router);

  iserDataDecoded:any = null;

  sendRegistrationData(userData: IuserData): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signup', userData);
  }
  sendLoginData(userData: IuserData): Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signin', userData);
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
