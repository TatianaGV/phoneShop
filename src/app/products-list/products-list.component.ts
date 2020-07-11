import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from '../services/product.service';
import { IProductItem } from '../interfaces/interface-item';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  constructor(private _ProductService: ProductService) {}

  public ngOnInit(): void {}

  public get ProductItems(): Observable<IProductItem[]> {
    return this._ProductService.items$;
  }

}
