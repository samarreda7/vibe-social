import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Post } from '../../../../../core/models/post.interface';
import { PostsService } from '../../../../../core/services/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TimeagoPipe } from '../../../../../shared/pipes/timeago-pipe';

@Component({
  selector: 'app-share-modal',
  imports: [ReactiveFormsModule, TimeagoPipe],
  templateUrl: './share-modal.component.html',
  styles: []
})
export class ShareModalComponent {
  @Input() post!: Post;
  @Output() onClose = new EventEmitter<void>();
  @Output() onShared = new EventEmitter<void>();

  private readonly postsService = inject(PostsService);
  private readonly cdr = inject(ChangeDetectorRef);
  body = new FormControl('');
  isLoading = false;

  get targetPostId(): string {
    return this.post.isShare && this.post.sharedPost
      ? this.post.sharedPost._id
      : this.post._id;
  }

  
  get previewPost(): Post {
    return this.post.isShare && this.post.sharedPost
      ? this.post.sharedPost
      : this.post;
  }

  close() { this.onClose.emit(); }

 share() {
  if (this.isLoading) return;
  this.isLoading = true;
  this.cdr.detectChanges();

  const trimmed = this.body.value?.trim();
  const data = trimmed ? { body: trimmed } : {};  // empty obj if no text

  this.postsService.sharePost(this.targetPostId, data).subscribe({
    next: (res) => {
      this.isLoading = false;
      this.cdr.detectChanges();
      if (res.success) {
        this.onShared.emit();
        this.onClose.emit();
      }
    },
    error: (err) => {
      console.log(err);
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  });
}
}