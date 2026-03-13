import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgetpasswordComponent } from './features/forgetpassword/forgetpassword.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangepasswordComponent } from './features/changepassword/changepassword.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { DetailsComponent } from './features/details/details.component';
import { FeedContentComponent } from './features/feed/components/feed-content/feed-content.component';
import { MyPostsComponent } from './features/feed/components/my-posts/my-posts.component';
import { SavedPostsComponent } from './features/feed/components/saved-posts/saved-posts.component';
import { AllnotificationComponent } from './features/notification/components/allnotification/allnotification.component';
import { UnreadNotificationComponent } from './features/notification/components/unread-notification/unread-notification.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget', component: ForgetpasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'feed',
        component: FeedComponent,
        children: [
          { path: '', redirectTo: 'content', pathMatch: 'full' },
          { path: 'content', component: FeedContentComponent },
          { path: 'myposts', component: MyPostsComponent },
          { path: 'Saved', component: SavedPostsComponent },
        ],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'myposts', pathMatch: 'full' },
          { path: 'myposts', component: MyPostsComponent },
          { path: 'Saved', component: SavedPostsComponent },
        ],
      },
      { path: 'notification', component: NotificationComponent ,children:[
        { path: '', redirectTo: 'AllNotification', pathMatch: 'full' },
        {path:"AllNotification",component:AllnotificationComponent},
        {path:"unreadNotification",component:UnreadNotificationComponent},
      ]},
      { path: 'change', component: ChangepasswordComponent },
      { path: 'details/:id', component: DetailsComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];
