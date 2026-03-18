import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;

  private readonly httpClient = inject(HttpClient);
  getprofile(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/profile-data`);
  }
  getUserProfile(UserId: string): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/${UserId}/profile`);
  }
  followUnfollowUser(UserId: string): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/users/${UserId}/follow`, null);
  }
  updateProfilePhoto(formData: FormData): Observable<any> {
    return this.httpClient.put('https://route-posts.routemisr.com/users/upload-photo', formData);
  }
}
