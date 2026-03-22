import { Post } from './../../core/models/post.interface';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { CommentPostComponent } from '../feed/components/feed-content/comment-post/comment-post.component';
import { PostComponent } from '../feed/components/feed-content/post/post.component';

@Component({
  selector: 'app-details',
  imports: [CommentPostComponent, PostComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  userId: string = '';
  PostDetail: Post = { user: {} } as Post;
  postId: string = '';
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getId();
  }
  getId(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id')!;
      this.getSinglePost();
    });
  }
  getSinglePost(): void {
    this.postsService.getSinglePost(this.postId).subscribe({
      next: (res) => {
        console.log(res);
        this.PostDetail = res.data.post;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deletePost(postId: string): void {
    this.postsService.deletePosts(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/feed']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  LikeUnlikePost(postId: string): void {
    this.postsService.LikeUnlikePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this.getSinglePost();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  isLikedByMe(post: Post): boolean {
    return post.likes?.some((id: string) => id === this.userId) ?? false;
  }
  SaveUnsavePost(postId: string): void {
    this.postsService.savedUnsavePost(postId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
