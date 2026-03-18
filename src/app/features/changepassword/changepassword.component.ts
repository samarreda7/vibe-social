import { ChangeDetectorRef, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-changepassword',
  imports: [ReactiveFormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css',
})
export class ChangepasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  loading: boolean = false;
  changepassForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@\$%\^&*-]).{8,}$/),
      ]),
      rePassword: new FormControl('', Validators.required),
    },
    { validators: [this.confirmpassword] },
  );
  confirmpassword(group: AbstractControl) {
    const password = group.get('newPassword')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (rePassword !== password && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  changesubscripe: Subscription = new Subscription();
  changepassword(): void {
    if (this.changepassForm.valid) {
      this.loading = true;
      this.changesubscripe.unsubscribe();
      const { rePassword, ...body } = this.changepassForm.value;

      this.changesubscripe = this.authService.changepassword(body).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.removeItem('socialToken');
          localStorage.removeItem('socialUser');
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);

          this.loading = false;
          this.cdr.detectChanges();
        },
        complete: () => {
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
    }
  }
}
