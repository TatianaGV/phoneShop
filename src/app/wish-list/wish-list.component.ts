import { Component, OnInit } from '@angular/core';

import { IProductItem } from '../interfaces/interface-item';
import { ProductService } from '../services/product.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {

  constructor(public _fService: FavoriteService) {}

  public ngOnInit(): void {
  }

}
