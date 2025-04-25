import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'pt-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule] 
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = false;
  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    this.auth
      .login(this.form.getRawValue())    
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          this.loading = false;
          this.errorMsg =
            err.status === 401
              ? 'Credenciales incorrectas'
              : 'Error de conexión';
        }
      });
  }
}
