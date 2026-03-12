import { Component } from '@angular/core';
import { SideLeftComponent } from './components/side-left/side-left.component';
import { SideRightComponent } from './components/side-right/side-right.component';
import { FeedContentComponent } from './components/feed-content/feed-content.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-feed',
  imports: [SideLeftComponent, SideRightComponent, FeedContentComponent,RouterOutlet ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {

}
