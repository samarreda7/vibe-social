import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { Notification } from '../../notification.interface';
import { TimeagoPipe } from '../../../../shared/pipes/timeago-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-unread-notification',
  imports: [TimeagoPipe, RouterLink],
  templateUrl: './unread-notification.component.html',
  styleUrl: './unread-notification.component.css',
})
export class UnreadNotificationComponent {
  private readonly notificationService = inject(NotificationService);
  notificationList: Notification[] = [];
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.getunreadNotifaction();
  }
  getunreadNotifaction() {
    this.notificationService.getunreadNotifaction().subscribe({
      next: (res) => {
        console.log(res.data.notifications);
        this.notificationList = res.data.notifications;
        this.notificationService.listLength$.next(this.notificationList.length); 
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
