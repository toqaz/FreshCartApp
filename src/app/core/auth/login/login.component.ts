import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { STORED_KEYS } from '../../constants/storedKey';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
private readonly authService = inject(AuthService)

  private readonly router = inject(Router)

  errorMessage:WritableSignal<string>=signal<string>('')

  isLoading:WritableSignal<boolean>=signal<boolean>(false)

  flag:boolean=true;
  refSubscription:Subscription = new Subscription()

    loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ])
  });


  submitLoginForm(): void {
    if(this.loginForm.valid){

      this.isLoading.set(true)
      this.refSubscription.unsubscribe()
      this.refSubscription = this.authService.sendLoginData(this.loginForm.value).subscribe({
        next:(res)=>{
          if( res.message === 'success' ){
            this.isLoading.set(false)
            this.loginForm.reset();
            localStorage.setItem(STORED_KEYS.userToken, res.token)

            this.authService.decodedUserToken();
            this.errorMessage.set('')
            setTimeout(()=>{this.router.navigate(['/home'])},1000)
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading.set(false)
          this.errorMessage.set(err.error.message);
        }
      })
    }
  }

  togglePasswordType():void{
    this.flag = !this.flag
  }


}
