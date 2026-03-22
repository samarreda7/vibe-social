import { PostsService } from './../../../../../../core/services/posts.service';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../../../../../core/models/post.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post-model',
  imports: [ReactiveFormsModule ],
  templateUrl: './edit-post-model.component.html',
  styleUrl: './edit-post-model.component.css',
})
export class EditPostModelComponent implements OnInit {
  private readonly postsService = inject(PostsService)
  @Input() post!: Post;
  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdated = new EventEmitter<void>();

  body = new FormControl('');
  selectedImage: File | null = null;
  isLoading = false;

  ngOnInit() {
    this.body.setValue(this.post.body); // pre-fill existing text
  }

previewUrl: string | null = null;

onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.selectedImage = file;
    this.previewUrl = URL.createObjectURL(file);
  }
}

  submitEdit() {
    const formData = new FormData();
    formData.append('body', this.body.value!);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }
    this.isLoading = true;
    this.postsService.updatePost(this.post._id, formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.onUpdated.emit();
        this.onClose.emit();
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
  
}
