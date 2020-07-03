import { Component, OnInit, Input } from '@angular/core';
import { IProductItem } from '../interfaces/interface-item';

@Component({
  selector: 'app-basket-product-item',
  templateUrl: './basket-product-item.component.html',
  styleUrls: ['./basket-product-item.component.scss']
})
export class BasketProductItemComponent implements OnInit {

  @Input()
  public item: IProductItem;

  constructor() { }

  public ngOnInit(): void {
  }

}
