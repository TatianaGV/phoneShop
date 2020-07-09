import { Component, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {

  constructor(public _pService: ProductService) {}

  public ngOnInit(): void {
  }

}
