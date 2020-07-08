import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  public items: Observable<IProductItem []>;

  constructor(private _pService: ProductService) {}

  public ngOnInit(): void {
    this.items = this._pService.getItems();
  }

}
