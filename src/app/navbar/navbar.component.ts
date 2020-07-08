import { Component, OnInit, DoCheck } from '@angular/core';

import { DataBaseService } from '../services/data-base.service';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';

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

  constructor(private _fService: FavoriteService,
              private _cService: CartService) { }

  public ngOnInit(): void {
    this.countItemInWishList = this._fService.getCountItemsFromWishList();
    this.countItemInCart = this._cService.getCountItemsFromCart();
    this.totalPrice = this._cService.getTotalPriceFromCart();
  }

  public ngDoCheck(): void {
    this.countItemInWishList = this._fService.getCountItemsFromWishList();
    this.countItemInCart = this._cService.getCountItemsFromCart();
    this.totalPrice = this._cService.getTotalPriceFromCart();
  }

}
