import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donkey } from '../models/donkey.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DonkeyService {
  private readonly API = `${environment.apiUrl}/api/donkeys`;
  private http = inject(HttpClient);

  getDonkeys(): Observable<Donkey[]> {
    return this.http.get<Donkey[]>(this.API);
  }

  getDonkey(id: number): Observable<Donkey> {
    return this.http.get<Donkey>(`${this.API}/${id}`);
  }

  createDonkey(form: FormData): Observable<Donkey> {
    return this.http.post<Donkey>(this.API, form);
  }

  deleteDonkey(id: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}?userId=${userId}`);
  }
}
