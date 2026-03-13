import { Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  notificationList: Notification[] = [];
  ngOnInit(): void {
    this.getAllNotification();
  }
  getAllNotification() {
    this.notificationService.getAllNotifaction().subscribe({
      next: (res) => {
        console.log(res.data.notifications);
        this.notificationList = res.data.notifications;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
