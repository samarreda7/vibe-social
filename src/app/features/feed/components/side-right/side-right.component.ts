import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FollowerSuggestionsService } from './follower-suggestions.service';
import { FollowSuggestions } from './follow-suggestions.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-right',
  imports: [NgClass],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent implements OnInit {
  private readonly followerSuggestionsService = inject(FollowerSuggestionsService);
  private readonly cdr = inject(ChangeDetectorRef);
  suggestionList: FollowSuggestions[] = [];
  showAll = false;
  userId: string = '';
  get visibleSuggestions() {
    return this.showAll ? this.suggestionList : this.suggestionList.slice(0, 1);
  }
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('socialUser')!)?._id;

    this.getFollowSugesstion();
  }

  getFollowSugesstion(): void {
    this.followerSuggestionsService.getFollowSuggestions().subscribe({
      next: (res) => {
        console.log(res.data.suggestions);
        this.suggestionList = res.data.suggestions;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  isFollowing(suggested: any): boolean {
    return suggested.followers?.some((follower: any) => follower._id === this.userId);
  }

  followUnfollowUser(userId: string): void {
    this.followerSuggestionsService.followUnfollowUser(userId).subscribe({
      next: () => {
        this.getFollowSugesstion();
        this.cdr.detectChanges();
      },
    });
  }
}
