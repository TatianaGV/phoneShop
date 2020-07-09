import { Component, OnInit, Inject, Input } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IProductItem } from '../interfaces/interface-item';
import { DataBaseService } from '../services/data-base.service';
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
    this.item.isCard = !this.item.isCard;
    if (this.item.isCard) {
      this._cService.pushItem(this.item);
      if (this.item.isFavorite) {
        this._fService.deleteItem(this.item.id);
      }
    } else {
      this._cService.deleteItem(this.item.id);
    }

    this.dialogRef.close();
  }

}
