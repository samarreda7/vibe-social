import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.interface';
import { PostsService } from '../../core/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/post.interface';
import { CommentPostComponent } from '../feed/components/feed-content/comment-post/comment-post.component';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PostComponent } from '../feed/components/feed-content/post/post.component';
import { MyPostsComponent } from '../feed/components/my-posts/my-posts.component';

@Component({
  selector: 'app-profile',
  imports: [
    CommentPostComponent,
    RouterLink,
    DatePipe,
    PostComponent,
    RouterOutlet,
    MyPostsComponent,
    RouterLinkActive,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  userId: string = '';
  postsList: Post[] = [];
  profileData: Profile | null = null;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getProfile(this.userId);
    this.getUserPosts(this.userId);
  }

  getProfile(userId: string) {
    this.profileService.getUserProfile().subscribe({
      next: (res) => {
        console.log(res.data.user);
        this.profileData = res.data.user;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUserPosts(userId: string) {
    this.postsService.getUserPosts(this.userId).subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.postsList = res.data.posts;
        this.cdr.detectChanges();
      },
    });
  }

  isLikedByMe(post: Post): boolean {
    return post.likes?.some((id: string) => id === this.userId) ?? false;
  }
  LikeUnlikePost(postId: string) {
    this.postsService.LikeUnlikePost(postId).subscribe({
      next: () => this.getUserPosts(this.userId),
    });
  }
  SaveUnsavePost(postId: string) {
    this.postsService.savedUnsavePost(postId).subscribe({
      next: () => this.getUserPosts(this.userId),
    });
  }
  deletePost(postId: string) {
    this.postsService.deletePosts(postId).subscribe({
      next: (res) => {
        if (res.success) this.getUserPosts(this.userId);
      },
    });
  }
}
