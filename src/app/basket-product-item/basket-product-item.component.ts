import { Component, OnInit, Input } from '@angular/core';
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

  constructor(private _cService: CartService) { }

  public ngOnInit(): void {}

  public removeItem(): void {
    this._cService.deleteItem(this.item.id);
  }


}
