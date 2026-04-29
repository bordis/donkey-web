import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly BASE = `${environment.apiUrl}/api/storage/image`;

  imageUrl(objectName: string | undefined): string | null {
    if (!objectName) return null;
    return `${this.BASE}?object=${encodeURIComponent(objectName)}`;
  }
}
