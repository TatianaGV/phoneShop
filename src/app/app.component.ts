import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public wishList: string = 'assets/icons/wish-list.svg';
  public basket: string = 'assets/icons/basket.svg';

}
