import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { STORED_KEYS } from '../../constants/storedKey';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly toasterService = inject(ToastrService);
  private readonly router = inject(Router);

  flag: boolean = true;

  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  errorMessage: WritableSignal<string> = signal<string>('');

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    ]),
  });

  submitResetNewPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.isLoading.set(true);
      this.authService;
      const email = this.resetPasswordForm.get('email')!.value;
      const newPAssword = this.resetPasswordForm.get('password')!.value;

      this.authService.resetNewPassword(email, newPAssword).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading.set(false);
          localStorage.setItem(STORED_KEYS.userToken, res.token);
          this.authService.decodedUserToken();
          this.router.navigate(['home']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.toasterService.error(err.error.message, 'Fresh Cart');
        },
      });
    }
  }
  togglePasswordType(): void {
    this.flag = !this.flag;
  }
}
