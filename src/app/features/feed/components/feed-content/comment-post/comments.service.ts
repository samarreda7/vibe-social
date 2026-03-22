import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getAllComments(postId: string): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments?page=1&limit=10`,
    );
  }
  createComment(postId: string, data: object): Observable<any> {
    return this.httpClient.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, data);
  }
  updateComment(postId: string, commentId: string, data: object): Observable<any> {
    return this.httpClient.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }
  LikeUnlikecomment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.put(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/like`,
      null,
    );
  }
  getCommentReplies(postId: string, commentId: string): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
    );
  }
  createReply(postId: string, commentId: string, data: object): Observable<any> {
    return this.httpClient.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }
}
