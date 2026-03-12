import { Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post.interface';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentPostComponent } from './comment-post/comment-post.component';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe } from '@angular/common';
import { PostComponent } from "./post/post.component";

@Component({
  selector: 'app-feed-content',
  imports: [ReactiveFormsModule, CommentPostComponent, RouterLink, DatePipe, PostComponent],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cdr = inject(ChangeDetectorRef);
  content: FormControl = new FormControl('');
  privacy: FormControl = new FormControl('public');
  userId: string = '';
  name: string = '';
  photo: string = '';
  postsList: Post[] = [];
  saveFile!: File;
  imgUrl: string | ArrayBuffer | null | undefined | SafeUrl;

  ngOnInit(): void {
    
    this.getAllPosts();
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;
    this.name = JSON.parse(localStorage.getItem('socialUser')!)?.name;
    this.photo = JSON.parse(localStorage.getItem('socialUser')!)?.photo;
  }
  getAllPosts(): void {
    this.postsService.getAllPosts().subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.postsList = res.data.posts;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  changeImg(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.saveFile = input.files[0];
      const objectUrl = URL.createObjectURL(this.saveFile);
      this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    }
  }
  submitForm(e: Event, form: HTMLFormElement): void {
    e.preventDefault();
    const formData = new FormData();
    if (this.content.value) {
      formData.append('body', this.content.value);
    }
    if (this.privacy.value) {
      formData.append('privacy', this.privacy.value);
    }
    if (this.saveFile) {
      formData.append('image', this.saveFile);
    }
    this.postsService.createPosts(formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPosts();
          form.reset();
          this.imgUrl = '';
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  LikeUnlikePost(postId: string) {
  this.postsService.LikeUnlikePost(postId).subscribe({
    next: () => this.getAllPosts()
  });
}
  SaveUnsavePost(postId: string) {
  this.postsService.savedUnsavePost(postId).subscribe({
    next: () => this.getAllPosts()
  });
}

deletePost(postId: string) {
  this.postsService.deletePosts(postId).subscribe({
    next: (res) => { if (res.success) this.getAllPosts(); }
  });
}
  isLikedByMe(post: Post): boolean {
    return post.likes?.some((id: string) => id === this.userId) ?? false;
  }
}
