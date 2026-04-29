import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    // console.log('App initialized');
    // console.log('Current user:', this.authService.currentUser());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
