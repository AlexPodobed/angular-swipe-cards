import {NgModule} from '@angular/core';
import {SwipeCardComponent} from './card/swipe-card.component';
import {CardWrapperComponent} from './card-wrapper/card-wrapper.component';
import {SwipeableDirective} from './card/swipeable.directive';

@NgModule({
  imports: [],
  declarations: [SwipeCardComponent, CardWrapperComponent, SwipeableDirective],
  exports: [SwipeCardComponent, CardWrapperComponent, SwipeableDirective]
})
export class SwipeCardLibModule {
}
