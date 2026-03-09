import { Post } from './../../../../../core/models/post.interface';
import { ChangeDetectorRef, Component, inject, Input, input, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { Comment } from './comment.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-post',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  private readonly commentsService = inject(CommentsService);
  private readonly cdr = inject(ChangeDetectorRef);
  content: FormControl = new FormControl('');
  private readonly sanitizer = inject(DomSanitizer);
  saveFile!: File;
  imgurl: string | ArrayBuffer | null | undefined | SafeUrl;
  userId: string = '';
  photo: string = '';
  commentsList: Comment[] = [];
  @Input() PostId: string = '';
  ngOnInit(): void {
    this.getAllComment();
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.photo = JSON.parse(localStorage.getItem('socialUser')!)?.photo;
  }
  getAllComment(): void {
    this.commentsService.getAllComments(this.PostId).subscribe({
      next: (res) => {
        this.commentsList = res.data.comments;
        console.log(this.commentsList);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changeimg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.saveFile = input.files[0];
      const objectUrl = URL.createObjectURL(this.saveFile);
      this.imgurl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      this.cdr.detectChanges();
      console.log(this.saveFile);
    }
  }
  submitForm(e: Event, form: HTMLFormElement) {
    e.preventDefault();
    const formData = new FormData();
    if (this.content.value) {
      formData.append('content', this.content.value);
    }
    if (this.saveFile) {
      formData.append('image', this.saveFile);
    }
    this.commentsService.createComment(this.PostId, formData).subscribe({
      next: (res) => {
        if (res.success) {
          form.reset();
          this.imgurl = null;
          this.getAllComment();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  LikeUnlikePost(postId: string, commentId: string): void {
    this.commentsService.LikeUnlikecomment(postId, commentId).subscribe({
      next: (res) => {
        this.getAllComment();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isLikedByMe(comment: Comment): boolean {
    return comment.likes?.some((id: string) => id === this.userId) ?? false;
  }
}
