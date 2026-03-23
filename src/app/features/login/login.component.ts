import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  msgError: string = '';
  loading: boolean = false;

  loginform: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@\$%\^&*-]).{8,}$/),
    ]),
  });
  loginsubscripe: Subscription = new Subscription();
  submitForm(): void {
    if (this.loginform.valid) {
      this.loading = true;
      this.loginsubscripe.unsubscribe();
      this.loginsubscripe = this.authService.signIn(this.loginform.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('socialToken', res.data.token);
          localStorage.setItem('socialUser', JSON.stringify(res.data.user));

          this.router.navigate(['/feed']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.loading = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    } else {
      this.loginform.markAllAsTouched(); 
    }
  }
}
