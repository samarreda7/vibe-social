import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Profile } from '../profile.interface';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { ProfileService } from '../profile.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profilepic-model',
  imports: [ImageCropperComponent ,FormsModule],
  templateUrl: './profilepic-model.component.html',
  styleUrl: './profilepic-model.component.css',
})
export class ProfilepicModelComponent {
  @Input() profile!: Profile;
  @Input() imageFile!: File;         // file passed from parent
  @Output() onClose = new EventEmitter<void>();
  @Output() onchange = new EventEmitter<void>();
  @Output() onupdate = new EventEmitter<void>();

  private readonly profileService = inject(ProfileService);
  private readonly cdr = inject(ChangeDetectorRef);

  croppedImage: Blob | null = null;
  scale = 1;
  transform = { scale: 1 };
  privacy = 'public';
  loading = false;

  onZoomChange() {
    this.transform = { scale: this.scale };
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob ?? null;
  }

  savePhoto() {
    if (!this.croppedImage) return;
    this.loading = true;

    const formData = new FormData();
    formData.append('photo', this.croppedImage, 'profile.jpg');

    this.profileService.updateProfilePhoto(formData).subscribe({
      next: () => {
        this.loading = false;
        this.onchange.emit();
        this.onClose.emit();
        this.onupdate.emit();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
