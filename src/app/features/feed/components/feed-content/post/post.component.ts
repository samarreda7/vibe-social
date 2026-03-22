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
import { TimeagoPipe } from '../../../../../shared/pipes/timeago-pipe';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { EditPostModelComponent } from './edit-post-model/edit-post-model.component';

@Component({
  selector: 'app-post',
  imports: [
    CommentPostComponent,
    RouterLink,
    DatePipe,
    TimeagoPipe,
    ShareModalComponent,
    EditPostModelComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Output() onShare = new EventEmitter<void>();
  showEditModal = false;

  showShareModal = false;

  openShareModal() {
    this.showShareModal = true;
  }
  closeShareModal() {
    this.showShareModal = false;
  }
  @Output() onUpdated = new EventEmitter<void>();
  openEditModal() {
    this.showEditModal = true;
  }
  closeEditModal() {
    this.showEditModal = false;
  }
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
