import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly httpClient = inject(HttpClient);

  getAllNotifaction(): Observable<any> {
    return this.httpClient.get(environment.baseUrl +`/notifications?page=1&limit=20`);
  }
  getunreadNotifaction(): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl +`/notifications?unread=false&page=1&limit=20`,
    );
  }
  getUnreadcount(): Observable<any> {
    return this.httpClient.get(environment.baseUrl +`/notifications/unread-count`);
  }

  markAllNotificationRead(): Observable<any> {
    return this.httpClient.patch(environment.baseUrl +`/notifications/read-all`, null);
  }
  markNotificationRead(notificationId: string): Observable<any> {
    return this.httpClient.patch(
      environment.baseUrl +`/notifications/${notificationId}/read`,
      null,
    );
  }
  listLength$ = new BehaviorSubject<number>(0);
  refreshNotifications$ = new Subject<void>();
  refreshNotificationsCount$ = new Subject<void>();
}
