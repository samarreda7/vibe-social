import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notification.interface';
import { TimeagoPipe } from '../../shared/pipes/timeago-pipe';


@Component({
  selector: 'app-notification',
  imports: [TimeagoPipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  notificationList:Notification[] = [];
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this.getAllNotifaction();
  }
  getAllNotifaction() {
    this.notificationService.getAllNotifaction().subscribe({
      next: (res) => {
        console.log(res.data.notifications);
        this.notificationList = res.data.notifications;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
