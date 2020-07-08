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

  public items: IProductItem[] = [];
  public itemsFavoriteId: string[] = [];

  constructor(private _pService: ProductService,
              private _fService: FavoriteService) {}

  public ngOnInit(): void {
    this.initWishList();
  }

  public initWishList(): void {
    this._pService
      .getItems()
      .subscribe((items) => {
        this.itemsFavoriteId = this._fService.getItemId();
        this.items = items.filter((item) => {
          return this.itemsFavoriteId.indexOf(item.id) > -1;
        });
      });
  }


}
