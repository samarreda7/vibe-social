import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { Notification } from '../../notification.interface';
import { TimeagoPipe } from '../../../../shared/pipes/timeago-pipe';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allnotification',
  imports: [TimeagoPipe, NgClass,RouterLink],
  templateUrl: './allnotification.component.html',
  styleUrl: './allnotification.component.css',
})
export class AllnotificationComponent {
  private readonly notificationService = inject(NotificationService);
  notificationList: Notification[] = [];
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.getAllNotifaction();

    this.notificationService.refreshNotifications$.subscribe(() => {
      this.getAllNotifaction();
    });
  }
  getAllNotifaction() {
    this.notificationService.getAllNotifaction().subscribe({
      next: (res) => {
        console.log(res.data.notifications);
        console.log(res.data.notifications.type);
        this.notificationList = res.data.notifications;
        this.notificationService.listLength$.next(this.notificationList.length);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  markNotificationRead(NotificationId: string) {
    this.notificationService.markNotificationRead(NotificationId).subscribe({
      next: (res) => {
        console.log(res);
        this.notificationService.refreshNotificationsCount$.next();
        this.getAllNotifaction();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
