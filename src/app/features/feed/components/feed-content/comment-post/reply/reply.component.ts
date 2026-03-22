import { ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import { TimeagoPipe } from '../../../../../../shared/pipes/timeago-pipe';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../comments.service';
import { Reply } from './reply.interface';

@Component({
  selector: 'app-reply',
  imports: [ReactiveFormsModule, TimeagoPipe, DatePipe],
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css',
})
export class ReplyComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() commentId!: string;
  @Input() postId!: string;
  @Input() parentUsername!: string;
  @Input() photo: string = '';

  replylist: Reply[] = [];
  showReplies = true; // already visible since deferred until Reply button clicked
  replyContent = new FormControl('');
  imgurl: string | null = null;
  imageFile: File | null = null;
  ngOnInit(): void {
    this.getReplies();
  }

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  getReplies() {
    this.commentsService.getCommentReplies(this.postId, this.commentId).subscribe({
      next: (res) => {
        this.replylist = res.data.replies;
        this.cdr.markForCheck();
      },
      error: (err) => console.log(err),
    });
  }

  changeimg(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.imageFile = file; 
    const objectUrl = URL.createObjectURL(file);
    this.imgurl = objectUrl; 
    this.cdr.markForCheck();
  }

  submitReply(event: Event, form: HTMLFormElement) {
    event.preventDefault();
    if (!this.replyContent.value && !this.imageFile) return;

    const formData = new FormData();

    if (this.replyContent.value) {
      formData.append('content', this.replyContent.value);
    }
    if (this.imageFile) {
      formData.append('image', this.imageFile); 
    }

    this.commentsService.createReply(this.postId, this.commentId, formData).subscribe({
      next: (res: any) => {
        this.replylist.push(res.data.reply);
        this.replyContent.reset();
        this.imgurl = null;
        this.imageFile = null;
        this.cdr.markForCheck();
      },
      error: (err) => console.log(err),
    });
  }
}
