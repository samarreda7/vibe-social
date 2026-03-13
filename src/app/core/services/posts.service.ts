import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/posts`);
  }
  GETBookMarks(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/users/bookmarks`);
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
  savedUnsavePost(postId: string): Observable<any> {
    return this.httpClient.put(`https://route-posts.routemisr.com/posts/${postId}/bookmark`, null);
  }
  getpostLike(postId: string): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/posts/${postId}/likes?page=1&limit=20`,
    );
  }
   listLength$ = new BehaviorSubject<number>(0);
}
