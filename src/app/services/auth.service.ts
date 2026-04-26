import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = `${environment.apiUrl}/api/auth`;
  private http = inject(HttpClient);

  currentUser = signal<User | null>(this.loadFromStorage());

  private loadFromStorage(): User | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  register(email: string, password: string, role: string): Observable<User> {
    return this.http.post<User>(`${this.API}/register`, { email, password, role });
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.API}/login`, { email, password }).pipe(
      tap(user => {
        this.currentUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }
}
