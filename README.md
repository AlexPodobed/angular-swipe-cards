# ng-swipe-card

Tinder-like swipe-able cards


## Installation
The package can be installed via npm:

`npm install ng-swipe-card --save`

You'll need to install and include **hammerjs** to your project to run this lib.

`npm install hammerjs --save`


## Usage
Include hammerjs to `angular.json` as build option:

```
{
  "architect": {
    // ...
    "build": {
      "options": {
        // ...
        "scripts": ["./node_modules/hammerjs/hammer.min.js"] 
      }
    } 
},
```

Include styles to your root scss:

`@import "~ng-swipe-card/style/styles";`

Include **SwipeCardLibModule** to your root module

```ts
import {SwipeCardLibModule} from 'ng-swipe-card';

@NgModule({
  // ...
  imports: [ SwipeCardLibModule ]
})

```

Print your cards using `<sw-card-wrapper></sw-card-wrapper>` component and `swSwipeable` directive:

```html
 <sw-card-wrapper #cardWrapper>
      <div class="card" *ngFor="let card of cards, let index = index"
           swSwipeable
           [width]="400"
           [height]="600"
           [orientation]="'x'"
           (onRelease)="removeBy(index)">
        {{card}}
      </div>
      <div class="btn-block">
        <button (click)="cardWrapper.dislike()">dislike</button>
        <button (click)="cardWrapper.like()">like</button>
      </div>
 </sw-card-wrapper>
```

@Inputs:

| Name | Description |
| --- | --- |
| `[width]: number` | set card width
| `[height]: number` | set card height
| `[fixed]: boolean` | set fixed behaviour (if `true` - prevent swiping)
| `[orientation]: 'x' or 'y' or 'xy'` | set swiping orientation


@Outputs:

| Name | Description |
| --- | --- |
| `(released): EventEmitter` | dispatch event when card has been released
| `(swiped): EventEmitter<boolean>` | dispatch event when card has been swiped (`true` - if user swipe to right, `false` - to left) 


## Customize

To customize colors on swipe you can extend default options:

```ts
import {SW_SWIPE_CARD_DEFAULT_OPTIONS} from 'ng-swipe-card';

@NgModule({
  // ...
  providers: [{
    provide: SW_SWIPE_CARD_DEFAULT_OPTIONS,
    useValue: {likeColor: '104,159,56', dislikeColor: '193,3,2'}
  }]
})
export class AppModule {
}
```
