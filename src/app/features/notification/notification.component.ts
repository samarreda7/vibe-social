import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.interface';
import { TimeagoPipe } from '../../shared/pipes/timeago-pipe';
import { AllnotificationComponent } from './components/allnotification/allnotification.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-notification',
  imports: [TimeagoPipe, AllnotificationComponent, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  listLength: number = 0;
  unreadCount: number = 0;
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.notificationService.listLength$.subscribe((len) => {
      this.listLength = len;
      this.getUnreadCount();
      this.cdr.detectChanges();
    });
  }
  markAllIRead() {
    this.notificationService.markAllNotificationRead().subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.refreshNotifications$.next();
        this.notificationService.refreshNotificationsCount$.next();
        this.getUnreadCount();
      },
    });
  }

  getUnreadCount() {
    this.notificationService.getUnreadcount().subscribe({
      next: (res) => {
        this.unreadCount = res.data.unreadCount;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
