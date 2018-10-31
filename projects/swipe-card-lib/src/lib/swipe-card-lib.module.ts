import {NgModule} from '@angular/core';
import {CardWrapperComponent} from './card-wrapper/card-wrapper.component';
import {SwipeableDirective} from './swipeable.directive';

@NgModule({
  imports: [],
  declarations: [CardWrapperComponent, SwipeableDirective],
  exports: [CardWrapperComponent, SwipeableDirective]
})
export class SwipeCardLibModule {
}
