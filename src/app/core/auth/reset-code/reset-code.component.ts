import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordComponent } from "../reset-password/reset-password.component";

@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, ResetPasswordComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.css',
})
export class ResetCodeComponent{
  private readonly authService = inject(AuthService);
  private readonly toasterService = inject(ToastrService)

  isLoading:WritableSignal<boolean>=signal<boolean>(false)

  resetCode:boolean = true;
  resetPassword:boolean = false


  resetCodeForm: FormGroup = new FormGroup({
    code: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{4,}$/)])
})

sendingResetCode():void{
  if(this.resetCodeForm.valid){

    this.isLoading.set(true)
    const code = this.resetCodeForm.get('code')?.value
    this.authService.resetCode(code).subscribe({
      next:(res)=>{
        console.log(res);
        this.isLoading.set(false)
        this.resetCode = false;
        this.resetPassword =true;
      },
      error:(err)=>{
        this.isLoading.set(false)
        this.toasterService.error(err.error.message , 'Fresh Cart')
      }
    })
  }
}

}
