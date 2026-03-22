import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts`);
  }
  getfollowingPosts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts/feed?only=following&limit=20`);
  }
  GETBookMarks(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/users/bookmarks`);
  }
  getUserPosts(userId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/users/${userId}/posts`);
  }
  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}`);
  }
  createPosts(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + '/posts', data);
  }
  deletePosts(postId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/posts/${postId}`);
  }
  LikeUnlikePost(postId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/posts/${postId}/like`, null);
  }
  savedUnsavePost(postId: string): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/posts/${postId}/bookmark`, null);
  }
  getpostLike(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}/likes?page=1&limit=20`);
  }
  sharePost(postId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/posts/${postId}/share`, data);
  }
  updatePost(postId: string, formData: FormData): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `/posts/${postId}`, formData);
  }
  listLength$ = new BehaviorSubject<number>(0);
  MypostslistLength$ = new BehaviorSubject<number>(0);
  viewedUserId$ = new BehaviorSubject<string>('');
}
