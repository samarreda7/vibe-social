import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { PostComponent } from "../feed-content/post/post.component";

@Component({
  selector: 'app-community',
  imports: [PostComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css',
})
export class CommunityComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  userId: string = '';
  postsList: Post[] = [];

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.getfollowingposts();
    this.cdr.detectChanges();
  
  }

  getfollowingposts() {
    this.postsService.getfollowingPosts().subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.postsList = res.data.posts;
        this.postsService.listLength$.next(this.postsList.length);
        this.postsService.MypostslistLength$.next(this.postsList.length);
        this.cdr.detectChanges();
      },
    });
  }

  isLikedByMe(post: Post): boolean {
    return post.likes?.some((id: string) => id === this.userId) ?? false;
  }
  LikeUnlikePost(postId: string) {
    this.postsService.LikeUnlikePost(postId).subscribe({
      next: () => this.getfollowingposts(),
    });
  }
  SaveUnsavePost(postId: string) {
    this.postsService.savedUnsavePost(postId).subscribe({
      next: (res) => {
        this.getfollowingposts();
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
        if (res.success) this.getfollowingposts();
      },
    });
  }
}
