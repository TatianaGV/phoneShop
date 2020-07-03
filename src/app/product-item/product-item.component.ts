import { Component, OnInit, Input } from '@angular/core';

import { IProductItem } from '../interfaces/interface-item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {

  @Input()
  public item: IProductItem;

  constructor() { }

  public ngOnInit(): void {
  }

}
