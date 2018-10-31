import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly LIST = Array.from(new Array(10)).map((_, i) => i + 1);

  public cards: number[];

  constructor() {
    this.cards = [...this.LIST];
  }

  public reset(): void {
    this.cards = [...this.LIST];
  }

  public removeBy(index: number): void {
    this.cards.splice(index, 1);
  }
}
