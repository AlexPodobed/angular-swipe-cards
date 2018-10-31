import {AfterContentInit, Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {SwipeableDirective} from '../swipeable.directive';

@Component({
  selector: 'sw-card-wrapper',
  templateUrl: './card-wrapper.component.html',
  styleUrls: ['./card-wrapper.component.scss']
})
export class CardWrapperComponent implements OnInit, AfterContentInit {
  @ContentChildren(SwipeableDirective)
  public cards: QueryList<SwipeableDirective>;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
  }

  public like(): void {
    if (this.cards.first) {
      this.cards.first.simulateSwipe(true);
    }
  }

  public dislike(): void {
    if (this.cards.first) {
      this.cards.first.simulateSwipe(false);
    }
  }

}
