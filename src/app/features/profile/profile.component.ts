import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Profile } from './profile.interface';
import { PostsService } from '../../core/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/post.interface';
import { CommentPostComponent } from '../feed/components/feed-content/comment-post/comment-post.component';
import { RouterLink, RouterOutlet, RouterLinkActive, ActivatedRoute } from '@angular/router';
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
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  userId: string = '';
  Iduser: string = '';
  postsList: Post[] = [];
  profileData: Profile | null = null;
  listLength: number = 0;
  MypostslistLength: number = 0;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.activatedRoute.paramMap.subscribe((param) => {
      const idFromRoute = param.get('id');

      if (idFromRoute) {
        this.postsService.viewedUserId$.next(idFromRoute);
        this.getUserProfile(idFromRoute);
        this.getUserPosts(idFromRoute);
      } else {
        this.postsService.viewedUserId$.next(this.userId);
        this.getProfile();
      }
    });

    this.postsService.listLength$.subscribe((len) => {
      this.listLength = len;
      this.cdr.detectChanges();
    });
    this.postsService.MypostslistLength$.subscribe((len) => {
      this.MypostslistLength = len;
      this.cdr.detectChanges();
    });
  }

  getProfile() {
    this.profileService.getprofile().subscribe({
      next: (res) => {
        console.log(res.data.user);
        this.profileData = res.data.user;
        this.getUserPosts(this.userId);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getUserProfile(userId: string) {
    this.profileService.getUserProfile(userId).subscribe({
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
    this.postsService.getUserPosts(userId).subscribe({
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
  isFollowing(profileData: any, myId: string): boolean {
    return profileData.followers.some((follower: any) => follower._id === myId);
  }
  LikeUnlikePost(postId: string) {
    this.postsService.LikeUnlikePost(postId).subscribe({
      next: () => this.getUserPosts(this.userId),
    });
  }
  followUnfollowUser(userId: string | undefined) {
    if (!userId) return;

    this.profileService.followUnfollowUser(userId).subscribe({
      next: (res) => {
        this.isFollowing(this.profileData,userId);
        this.cdr.detectChanges();
      },
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
