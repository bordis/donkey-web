import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private readonly API = `${environment.apiUrl}/api/posts`;
  private http = inject(HttpClient);

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API);
  }

  createPost(donkeyName: string, content: string, photoUrl: string, authorId: number): Observable<Post> {
    return this.http.post<Post>(this.API, { donkeyName, content, photoUrl, authorId });
  }
}
