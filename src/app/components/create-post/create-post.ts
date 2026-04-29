import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { DonkeyService } from '../../services/donkey.service';
import { StorageService } from '../../services/storage.service';
import { Donkey } from '../../models/donkey.model';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePostComponent implements OnInit {
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private donkeyService = inject(DonkeyService);
  protected storageService = inject(StorageService);
  private router = inject(Router);

  donkeys = signal<Donkey[]>([]);
  selectedDonkeyId: number | null = null;
  content = '';
  photoFile: File | null = null;
  photoPreview = '';
  error = signal('');
  loading = signal(false);

  ngOnInit(): void {
    this.donkeyService.getDonkeys().subscribe({
      next: donkeys => this.donkeys.set(donkeys),
      error: () => this.error.set('Failed to load donkeys.')
    });
  }

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
    if (!this.selectedDonkeyId || !this.content) {
      this.error.set('Please select a donkey and add content.');
      return;
    }
    const user = this.authService.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    const form = new FormData();
    form.append('content', this.content);
    form.append('donkeyId', String(this.selectedDonkeyId));
    form.append('authorId', String(user.id));
    if (this.photoFile) form.append('photo', this.photoFile);

    this.loading.set(true);
    this.error.set('');
    this.postService.createPost(form).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Failed to create post. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
