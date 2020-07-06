import { Component, OnInit, DoCheck } from '@angular/core';

import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, DoCheck {

  public countItemInCart: number;
  public totalPrice: number;
  public countItemInWishList: number;
  public basket: string = 'assets/icons/basket.svg';

  constructor(private service: DataBaseService) { }

  public ngOnInit(): void {
    this.countItemInCart = this.service.getCountItemsFromCart();
    this.totalPrice = this.service.getTotalPriceFromCart();
    this.countItemInWishList = this.service.getCountItemsFromWishList();
  }

  public ngDoCheck(): void {
    this.countItemInCart = this.service.getCountItemsFromCart();
    this.totalPrice = this.service.getTotalPriceFromCart();
    this.countItemInWishList = this.service.getCountItemsFromWishList();
  }

}
