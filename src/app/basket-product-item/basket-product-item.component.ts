import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProductItem } from '../interfaces/interface-item';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-basket-product-item',
  templateUrl: './basket-product-item.component.html',
  styleUrls: ['./basket-product-item.component.scss'],
})
export class BasketProductItemComponent implements OnInit {

  @Input()
  public item: IProductItem;

  @Output()
  public itemRemove = new EventEmitter();

  constructor(private _cService: CartService) { }

  public ngOnInit(): void {}

  public removeItem(): void {
    this.itemRemove.emit(this.item.id);
  }


}
