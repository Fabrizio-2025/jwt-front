import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.authService.register(user).subscribe({
        next: (response: any) => {
          
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          if (error.status === 401) {
            this.errorMessage = 'Unauthorized';
          } else {
            this.errorMessage = 'Registration failed';
          }
        },
      });
    }
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
