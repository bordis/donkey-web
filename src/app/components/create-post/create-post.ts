import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePostComponent {
  private postService = inject(PostService);
  private authService = inject(AuthService);
  private router = inject(Router);

  donkeyName = '';
  content = '';
  photoUrl = '';
  error = signal('');
  loading = signal(false);

  submit(): void {
    if (!this.donkeyName || !this.content) {
      this.error.set('Donkey name and content are required.');
      return;
    }
    const user = this.authService.currentUser();
    if (!user) {
      this.router.navigate(['/login']);
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.postService.createPost(this.donkeyName, this.content, this.photoUrl, user.id).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => {
        this.error.set('Failed to create post. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
