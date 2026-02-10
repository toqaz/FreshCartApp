import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../services/authentication/auth.service';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly authService = inject(AuthService)

  private readonly router = inject(Router);

  errorMessage:WritableSignal<string>=signal<string>('')

  isLoading:WritableSignal<boolean>=signal<boolean>(false)

  flag:boolean=true;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ]),
    rePassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/),
    ]),
  }, {validators: this.handleConfirmPassword });

  handleConfirmPassword(group:AbstractControl){
    return group.get('password')?.value === group.get('rePassword')?.value
    ? null : {mismatch: true}
  }

  submitRegisterForm(): void {
    if(this.registerForm.valid){

      this.isLoading.set(true)
      this.authService.sendRegistrationData(this.registerForm.value).subscribe({
        next:(res)=>{
          if( res.message === 'success' ){
            this.isLoading.set(false)
            this.registerForm.reset();

            this.errorMessage.set('')
            setTimeout(()=>{this.router.navigate(['/login'])},1000)
          }
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading.set(false)
          this.errorMessage.set(err.error.message);
        }
      })
    }else {
      this.registerForm.get('rePassword')?.patchValue('')
      this.registerForm.markAllAsTouched()
    }
  }

  togglePasswordType():void{
    this.flag = !this.flag
  }


}
