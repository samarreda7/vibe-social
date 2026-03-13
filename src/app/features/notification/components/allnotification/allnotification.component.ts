import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { NotificationService } from '../../notification.service';
import { Notification } from '../../notification.interface';
import { TimeagoPipe } from '../../../../shared/pipes/timeago-pipe';

@Component({
  selector: 'app-allnotification',
  imports: [TimeagoPipe],
  templateUrl: './allnotification.component.html',
  styleUrl: './allnotification.component.css',
})
export class AllnotificationComponent {
  private readonly notificationService = inject(NotificationService);
  notificationList: Notification[] = [];
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.getAllNotifaction();
  }
  getAllNotifaction() {
    this.notificationService.getAllNotifaction().subscribe({
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
