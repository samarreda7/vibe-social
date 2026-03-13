import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../../../profile/profile.service';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostComponent } from '../feed-content/post/post.component';

@Component({
  selector: 'app-my-posts',
  imports: [PostComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  userId: string = '';
  postsList: Post[] = [];

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getUserPosts(this.userId);
  }

  getUserPosts(userId: string) {
    this.postsService.getUserPosts(this.userId).subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.postsList = res.data.posts;
        this.postsService.listLength$.next(this.postsList.length);
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
      next: (res) => {
        this.getUserPosts(this.userId);
        console.log(res);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
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
