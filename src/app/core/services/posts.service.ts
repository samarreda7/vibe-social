import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/posts`);
  }
  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/${userId}/posts`);
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/posts/${postId}`);
  }
  createPosts(data: object): Observable<any> {
    return this.httpClient.post('https://route-posts.routemisr.com/posts', data);
  }
  deletePosts(postId: string): Observable<any> {
    return this.httpClient.delete(`https://route-posts.routemisr.com/posts/${postId}`);
  }
  LikeUnlikePost(postId: string): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/posts/${postId}/like`, null);
  }
  getpostLike(postId: string): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/posts/${postId}/likes?page=1&limit=20`,
    );
  }
}
