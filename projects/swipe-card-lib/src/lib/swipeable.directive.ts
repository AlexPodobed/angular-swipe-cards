import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output, Renderer2,
} from '@angular/core';
import {SW_SWIPE_CARD_DEFAULT_OPTIONS, SWSwipeCardConfig} from './swipe-card.config';

@Directive({
  selector: '[swSwipeable]',
})
export class SwipeableDirective implements OnInit, OnDestroy {
  private readonly animationDuration = 200;
  private released: Boolean = false;
  private element: HTMLElement;
  private overlay: HTMLElement;
  private releaseRadius: { x: number, y: number };
  private timeoutId: number;

  @HostBinding('style.width.px')
  @Input()
  public width: number;

  @HostBinding('style.height.px')
  @Input()
  public height: number;

  @Input()
  public fixed: Boolean = false;

  @Input()
  public orientation = 'xy';

  @Output()
  public onRelease = new EventEmitter();

  @Output()
  public onLike = new EventEmitter<boolean>();

  get allowSwipe(): boolean {
    return !this.fixed && !this.released;
  }

  @HostBinding('class.swipe-card-heap')
  public className = true;

  @HostListener('pan', ['$event'])
  onPan(event: any) {
    if (this.allowSwipe) {
      this.handleSwipeChange(event);
    }
  }

  @HostListener('panend', ['$event'])
  onPanEnd(event: any) {
    if (this.allowSwipe) {
      const conditionX = this.orientation.includes('x') && this.releaseRadius.x < Math.abs(event.deltaX || 0);
      const conditionY = this.orientation.includes('y') && this.releaseRadius.y < Math.abs(event.deltaY || 0);
      const like = this.isSwipePositive(event);

      (conditionX || conditionY) ? this.handleSwipeEnd(like) : this.handleCancelSwipe();
    }
  }

  constructor(@Inject(SW_SWIPE_CARD_DEFAULT_OPTIONS) private _defaultConfig: SWSwipeCardConfig,
              protected el: ElementRef,
              public renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.timeoutId);
  }

  ngOnInit(): void {
    this.initializeOverlay();
    this.releaseRadius = {x: this.width / 4, y: this.height / 4};
  }

  private initializeOverlay(): void {
    this.overlay = document.createElement('div');
    this.overlay.className = 'swipe-card-overlay';
    this.renderer.appendChild(this.element, this.overlay);
  }

  private translate({x, y, rotate = 0, duration = 0}) {
    const positionX = x && this.orientation.includes('x') ? (x) : 0;
    const positionY = y && this.orientation.includes('y') ? (y) : 0;

    this.renderer.setStyle(this.element, 'transition', `transform ${duration}ms ease`);
    this.renderer.setStyle(this.element, 'webkitTransform', `translate3d(${positionX}px, ${positionY}px, 0) rotate(${rotate}deg)`
    );
  }

  private handleSwipeChange(event: any) {
    const like = this.isSwipePositive(event);
    const opacity = Math.abs(event.distance) * 0.5 / this.element.offsetWidth;

    this.setBackgroundOverlay(like, opacity);
    this.translate({
      x: event.deltaX,
      y: event.deltaY,
      rotate: ((event.deltaX * 20) / this.element.clientWidth)
    });
  }

  private handleCancelSwipe() {
    this.resetBackgroundOverlay();
    this.translate({
      x: 0,
      y: 0,
      rotate: 0,
      duration: this.animationDuration
    });
  }

  private destroy() {
    this.resetElementStyles();
    this.resetBackgroundOverlay();
    this.renderer.removeChild(this.element, this.overlay);
    this.overlay = null;
  }

  private setBackgroundOverlay(like: boolean, opacity: number) {
    const color = like ? this._defaultConfig.likeColor : this._defaultConfig.dislikeColor;

    this.renderer.setStyle(this.overlay, 'transition', 'opacity 0s ease');
    this.renderer.setStyle(this.overlay, 'background-color', `rgba(${color}, ${opacity.toString()})`);
  }

  private resetBackgroundOverlay(): void {
    this.renderer.setStyle(this.overlay, 'transition', `opacity ${this.animationDuration}ms ease`);
    this.renderer.setStyle(this.overlay, 'background-color', 'rgba(255,255,255,0)');
  }

  private resetElementStyles(): void {
    this.renderer.setStyle(this.element, 'transition', 'transform 0s ease');
    this.renderer.setStyle(this.element, 'webkitTransform', 'translate3d(0, 0, 0) rotate(0deg)');
  }

  private isSwipePositive(event): boolean {
    return (this.orientation === 'y' && event.deltaY < 0) || (this.orientation !== 'y' && event.deltaX > 0);
  }

  private removeOverlay(like: boolean): void {
    const {offsetHeight, offsetWidth, clientHeight, clientWidth} = this.element;
    const y = (offsetHeight + clientHeight) * (like ? -1 : 1);
    const x = (offsetWidth + clientWidth) * (like ? 1 : -1);

    this.setBackgroundOverlay(like, 0.35);
    this.translate({
      x, y,
      rotate: (x * 20) / clientWidth,
      duration: 800
    });
  }

  private handleSwipeEnd(like: boolean): void {
    this.removeOverlay(like);
    this.released = true;

    this.timeoutId = window.setTimeout(() => {
      this.onLike.emit(like);
      this.onRelease.emit();
      this.destroy();
    }, this.animationDuration);
  }

  public simulateSwipe(like: boolean) {
    this.handleSwipeEnd(like);
  }

}
