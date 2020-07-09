import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

import { IProductItem } from '../interfaces/interface-item';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})

export class ProductItemComponent implements OnInit, OnDestroy {

  @Input()
  public item: IProductItem;

  constructor(public dialog: MatDialog,
              private _fb: AngularFirestore,
              private _fService: FavoriteService,
              private _pService: ProductService) { }

  public ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalViewComponent, {
      width: '500px',
      data: { item: this.item },
    });

    // takeUntil
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public addToFavorite(): void {
    this.item.isFavorite = !this.item.isFavorite;
    if (this.item.isFavorite) {
      this._fService.pushItem(this.item);
    } else {
      this._fService.deleteItem(this.item.id);
    }
  }

  public ngOnDestroy(): void {}

}
