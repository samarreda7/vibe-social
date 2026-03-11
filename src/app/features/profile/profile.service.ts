import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;

  private readonly httpClient = inject(HttpClient);
  getUserProfile(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/${this.userId}/profile`);
  }
}
