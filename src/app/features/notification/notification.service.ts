import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient = inject(HttpClient);

  getAllNotifaction(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/notifications?page=1&limit=10`);
  }
  getunreadNotifaction(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`);
  }
  listLength$ = new BehaviorSubject<number>(0);

}
