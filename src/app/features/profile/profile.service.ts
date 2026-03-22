import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;

  private readonly httpClient = inject(HttpClient);
  getprofile(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/users/profile-data`);
  }
  getUserProfile(UserId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/users/${UserId}/profile`);
  }

  updateProfilePhoto(formData: FormData): Observable<any> {
    return this.httpClient.put(environment.baseUrl + '/users/upload-photo', formData);
  }
}
