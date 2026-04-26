import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  role = 'SPONSOR';
  error = signal('');
  success = signal('');
  loading = signal(false);

  submit(): void {
    if (!this.email || !this.password) {
      this.error.set('Please fill in all fields.');
      return;
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error.set('Please enter a valid email address.');
      return;
    }
    // minimum password length validation
    if (this.password.length < 6) {
      this.error.set('Password must be at least 6 characters long.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.authService.register(this.email, this.password, this.role).subscribe({
      next: () => {
        this.success.set('Account created! Redirecting to login…');
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error.set(err.error || 'Registration failed.');
        this.loading.set(false);
      }
    });
  }
}
