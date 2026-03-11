import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';
import { CommentPostComponent } from '../comment-post/comment-post.component';
import { PostsService } from '../../../../../core/services/posts.service';
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [CommentPostComponent, RouterLink,DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  // userId:string='';
  ngOnInit(): void {
    // this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
  }
  // LikeUnlikePost(postId: string): void {
  //   this.postsService.LikeUnlikePost(postId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       // this.getUserPosts(this.userId);
  //       this.cdr.detectChanges();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
  // isLikedByMe(post: Post): boolean {
  //   return post.likes?.some((id: string) => id === this.userId) ?? false;
  // }
  // deletePost(postId: string): void {
  //   this.postsService.deletePosts(postId).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       if (res.success) {
  //         // this.getUserPosts(this.userId);
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
   @Input() userId!: string;
  @Output() onLike = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  likeUnlikePost(postId: string) {
    this.onLike.emit(postId);
  }

  deletePost(postId: string) {
    this.onDelete.emit(postId);
  }

  isLikedByMe(post: Post): boolean {
    return post.likes?.some((id: string) => id === this.userId) ?? false;
  }

}
