import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient = inject(HttpClient);

  getAllNotifaction(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/notifications?page=1&limit=10`);
  }
  getunreadNotifaction(): Observable<any> {
    return this.httpClient.get(
      `https://route-posts.routemisr.com/notifications?unread=false&page=1&limit=10`,
    );
  }
  getUnreadcount(): Observable<any> {
    return this.httpClient.get(`https://route-posts.routemisr.com/notifications/unread-count`);
  }

  markAllNotificationRead(): Observable<any> {
    return this.httpClient.patch(`https://route-posts.routemisr.com/notifications/read-all`, null);
  }
  markNotificationRead(notificationId: string): Observable<any> {
    return this.httpClient.patch(
      `https://route-posts.routemisr.com/notifications/${notificationId}/read`,
      null,
    );
  }
  listLength$ = new BehaviorSubject<number>(0);
  refreshNotifications$ = new Subject<void>();
  refreshNotificationsCount$ = new Subject<void>();
}
