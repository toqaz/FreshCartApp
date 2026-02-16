import { provideServerRendering } from '@angular/ssr';
import { Component, inject, OnDestroy, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'diagnostics_channel';
import { ToastrService } from 'ngx-toastr';
import { ResetCodeComponent } from "../reset-code/reset-code.component";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ResetCodeComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnDestroy{
  private readonly authService = inject(AuthService);
  private readonly toasterService = inject(ToastrService)

  forgetPassword:boolean = true
  resetCode:boolean = false;

  isLoading:WritableSignal<boolean>=signal<boolean>(false)

  refSubscription:Subscription = new Subscription()

  ForgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
})

submitForgetPasswordForm():void{
  if(this.ForgetPasswordForm.valid){

    this.isLoading.set(true)
    const email = this.ForgetPasswordForm.get('email')?.value
    this.refSubscription = this.authService.forgetPassword(email).subscribe({
      next:()=>{
        this.isLoading.set(false)
        this.forgetPassword = false;
        this.resetCode = true;
      },
      error:(err)=>{
        this.isLoading.set(false)
        this.toasterService.error(err.error.message , 'Fresh Cart')
      }
    })
  }
}

ngOnDestroy(): void {
  this.refSubscription.unsubscribe()
}
}
