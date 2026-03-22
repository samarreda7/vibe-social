import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowerSuggestionsService {
  private readonly httpClient = inject(HttpClient);
  header: Object = {
    headers: {
      AUTHORIZATION: `Bearer ${localStorage.getItem('socialToken')}`,
    },
  };

  getFollowSuggestions(): Observable<any> {
    return this.httpClient.get(
      'https://route-posts.routemisr.com/users/suggestions?limit=10',
      this.header,
    );
  }
  followUnfollowUser(UserId: string): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/users/${UserId}/follow`, null);
  }
}
