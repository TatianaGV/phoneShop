import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {

  public wishList: string = 'assets/icons/wish-list.svg';
  public basket: string = 'assets/icons/basket.svg';
  public phoneImg: string = 'assets/pic/iphone.jpg';

  constructor() { }

  public ngOnInit(): void {
  }

}
