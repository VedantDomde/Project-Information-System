
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/services.service'; // ✅ custom service

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log('⛔ Form is invalid');
      return;
    }

    const { username, password } = this.loginForm.value;
    console.log('📤 Sending login data:', { username, password });

    this.authService.login(username, password).subscribe({
      next: (res) => {
        console.log('✅ Login Success:', res);
        alert(res.message || 'Login successful');
        localStorage.setItem('userId', res.userId);
        this.router.navigate(['/project-search']);
      },
      error: (err) => {
        console.error('❌ Login failed:', err);
        alert(err?.error?.message || 'Login failed');
      }
    });
  }
}
