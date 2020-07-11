import { Component, OnInit, Inject, Input } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IProductItem } from '../interfaces/interface-item';
import { CartService } from '../services/cart.service';
import { FavoriteService } from '../services/favorite.service';

export interface IModelViewDialogData {
  item: IProductItem;
}

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss'],
})

export class ModalViewComponent implements OnInit {

  public item: IProductItem;

  constructor(private dialogRef: MatDialogRef<ModalViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: IModelViewDialogData,
              private _cService: CartService,
              private _fService: FavoriteService) {
    this.item = data.item;
    this.item.count = 1;
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public addItemToCart(): void {
    const item = this._cService.cartItems
      .find((elem) => elem.id === this.item.id);
    if (!item) {
      this._cService.pushItem(this.item);
      if (this.item.isFavorite) {
        this.item.isFavorite = !this.item.isFavorite;
        this._fService.deleteItem(this.item.id);
      }
    } else {
      alert('Этот товар уже добавлен в корзину');
    }

    this.dialogRef.close();
  }

}
