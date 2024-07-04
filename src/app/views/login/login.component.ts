import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      const user: User = { username, password };
      this.authService.login(user).subscribe(
        (response) => {
          
          console.log(response);
          localStorage.setItem('userId', response.userId.toString());
          this.router.navigate(['/home']);
        },
        (error) => {
          this.errorMessage = 'Login failed';
        }
      );
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}

