import { ChangeDetectorRef, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostComponent } from '../feed-content/post/post.component';

@Component({
  selector: 'app-saved-posts',
  imports: [PostComponent],
  templateUrl: './saved-posts.component.html',
  styleUrl: './saved-posts.component.css',
})
export class SavedPostsComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  postsList: Post[] = [];
  userId: string = '';

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getBookmarks();
  }
  getBookmarks(): void {
    this.postsService.GETBookMarks().subscribe({
      next: (res) => {
        console.log(res.data.bookmarks);
        this.postsList = res.data.bookmarks;
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
  LikeUnlikePost(postId: string) {
    this.postsService.LikeUnlikePost(postId).subscribe({
      next: () => this.getBookmarks(),
    });
  }
  SaveUnsavePost(postId: string) {
    this.postsService.savedUnsavePost(postId).subscribe({
      next: (res) => {
        this.getBookmarks();
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
        if (res.success) this.getBookmarks();
      },
    });
  }
}
