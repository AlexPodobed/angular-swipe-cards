import {InjectionToken} from '@angular/core';

export class SWSwipeCardConfig {
  likeColor?: string = '104,159,56';
  dislikeColor?: string = '193,3,2';
}

export const SW_SWIPE_CARD_DEFAULT_OPTIONS = new InjectionToken('sw-swipe-card-default-options', {
  providedIn: 'root',
  factory: SW_SWIPE_CARD_DEFAULT_OPTIONS_FACTORY
});

export function SW_SWIPE_CARD_DEFAULT_OPTIONS_FACTORY() {
  return new SWSwipeCardConfig();
}
