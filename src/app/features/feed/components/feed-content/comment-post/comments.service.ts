import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getAllComments(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}/comments?page=1&limit=10`);
  }
  createComment(postId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/posts/${postId}/comments`, data);
  }
  updateComment(postId: string, commentId: string, data: object): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `/posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }
  LikeUnlikecomment(postId: string, commentId: string): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `/posts/${postId}/comments/${commentId}/like`,
      null,
    );
  }
  getCommentReplies(postId: string, commentId: string): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `/posts/${postId}/comments/${commentId}/replies?page=1&limit=10`,
    );
  }
  createReply(postId: string, commentId: string, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `/posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }
}
