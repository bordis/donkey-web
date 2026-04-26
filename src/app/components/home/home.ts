import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService);
  protected authService = inject(AuthService);

  posts = signal<Post[]>([]);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.postService.getPosts().subscribe({
      
      next: posts => {
        // console.log('Posts loaded:', posts);
        this.posts.set(posts);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load posts. Is the API running?');
        this.loading.set(false);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('pt-PT', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }
}
