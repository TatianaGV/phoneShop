import { Component, OnInit } from '@angular/core';

import { IProductItem } from '../interfaces/interface-item';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {

  constructor(private _favoriteService: FavoriteService) {}

  public get favoriteItems(): IProductItem[] {
    return this._favoriteService.favoriteItems;
  }

  public ngOnInit(): void {
  }

}
