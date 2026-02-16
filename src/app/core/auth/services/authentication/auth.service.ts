import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { STORED_KEYS } from '../../../constants/storedKey';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PasswordResponse } from '../../models/password/password-response.interface';
import { ResetCode } from '../../models/resetCode/resetCode.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly router = inject(Router);

  private readonly platformId = inject(PLATFORM_ID);

  userDataDecoded: any = null;

  sendRegistrationData(userData: IuserData):Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signup', userData);
  }
  sendLoginData(userData: IuserData):Observable<UserDataResponse> {
    return this.httpClient.post<UserDataResponse>(environment.base_url + 'auth/signin', userData);
  }


  forgetPassword(email:string):Observable<PasswordResponse>{
    return this.httpClient.post<PasswordResponse>(environment.base_url + 'auth/forgotPasswords' , {email})
  }

  resetCode(code:string):Observable<ResetCode>{
    return this.httpClient.post<ResetCode>(environment.base_url + 'auth/verifyResetCode',{resetCode: code})
  }

  resetNewPassword(email:string , newPassword:string):Observable<any>{
    return this.httpClient.put<any>(environment.base_url +'auth/resetPassword',{email, newPassword})
  }

  getUserId(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const token = localStorage.getItem(STORED_KEYS.userToken);

    if (!token) {
      return null;
    }

    const decoded = jwtDecode<Itoken>(token);
    return decoded.id;
  }

  decodedUserToken() {
    if (localStorage.getItem(STORED_KEYS.userToken)) {
      this.userDataDecoded = jwtDecode(localStorage.getItem(STORED_KEYS.userToken)!);
      console.log(this.userDataDecoded, 'user-data');
    }
  }

  userLogout(): void {
    localStorage.removeItem(STORED_KEYS.userToken);
    this.router.navigate(['/login']);
  }

}
