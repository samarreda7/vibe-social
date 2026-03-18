import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NotificationService } from '../../../../features/notification/notification.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly cdr = inject(ChangeDetectorRef);
  photo: string = '';
  name: string = '';
  username: string = '';
  unreadCount: number = 0;

  menuOpen = false;
  ngOnInit(): void {
    this.photo = JSON.parse(localStorage.getItem('socialUser')!)?.photo;
    this.name = JSON.parse(localStorage.getItem('socialUser')!)?.name;
    this.username = JSON.parse(localStorage.getItem('socialUser')!)?.username;
    initFlowbite();
       this.notificationService.refreshNotifications$.subscribe(() => {
      this.getUnreadCount(); 
    });
    this.getUnreadCount();

  }
  logout(): void {
    localStorage.removeItem('socialToken');
    localStorage.removeItem('socialUser');
    this.router.navigate(['/login']);
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
