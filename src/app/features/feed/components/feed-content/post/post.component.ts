import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';
import { CommentPostComponent } from '../comment-post/comment-post.component';
import { PostsService } from '../../../../../core/services/posts.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-post',
  imports: [CommentPostComponent, RouterLink, DatePipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  ngOnInit(): void {}
  ngAfterViewInit() {
    initFlowbite();
  }
  @Input() userId!: string;
  @Output() onLike = new EventEmitter<string>();
  @Output() onSave = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  likeUnlikePost(postId: string) {
    this.onLike.emit(postId);
  }
  SaveUnsavePost(postId: string) {
    this.onSave.emit(postId);
  }

  deletePost(postId: string) {
    this.onDelete.emit(postId);
  }
  isLikedByMe(post: Post): boolean {
    return post.likes?.some((id: string) => id === this.userId) ?? false;
  }
}
