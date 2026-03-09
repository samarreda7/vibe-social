import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FollowerSuggestionsService } from './follower-suggestions.service';
import { FollowSuggestions } from './follow-suggestions.interface';

@Component({
  selector: 'app-side-right',
  imports: [],
  templateUrl: './side-right.component.html',
  styleUrl: './side-right.component.css',
})
export class SideRightComponent implements OnInit {
  private readonly followerSuggestionsService = inject(FollowerSuggestionsService);
  private readonly cdr = inject(ChangeDetectorRef);
  suggestionList: FollowSuggestions[] = [];
  ngOnInit(): void {
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
}
