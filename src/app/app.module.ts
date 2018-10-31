import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SwipeCardLibModule} from '../../projects/swipe-card-lib/src/lib/swipe-card-lib.module';
import {SW_SWIPE_CARD_DEFAULT_OPTIONS} from '../../projects/swipe-card-lib/src/lib/swipe-card.config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SwipeCardLibModule
  ],
  providers: [{
    provide: SW_SWIPE_CARD_DEFAULT_OPTIONS,
    useValue: {likeColor: '104,159,56', dislikeColor: '193,3,2'}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
