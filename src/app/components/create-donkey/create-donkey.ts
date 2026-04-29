import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DonkeyService } from '../../services/donkey.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-donkey',
  imports: [FormsModule],
  templateUrl: './create-donkey.html',
  styleUrl: './create-donkey.scss'
})
export class CreateDonkeyComponent {
  private donkeyService = inject(DonkeyService);
  private authService = inject(AuthService);
  private router = inject(Router);

  name = '';
  bio = '';
  photoFile: File | null = null;
  photoPreview = '';
  error = signal('');
  loading = signal(false);

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.photoFile = file;
      const reader = new FileReader();
      reader.onload = e => this.photoPreview = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (!this.name) {
      this.error.set('Donkey name is required.');
      return;
    }
    const user = this.authService.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    const form = new FormData();
    form.append('name', this.name);
    if (this.bio) form.append('bio', this.bio);
    form.append('registeredById', String(user.id));
    if (this.photoFile) form.append('photo', this.photoFile);

    this.loading.set(true);
    this.error.set('');
    this.donkeyService.createDonkey(form).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Failed to register donkey. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
