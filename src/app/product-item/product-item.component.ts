import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

import { IProductItem } from '../interfaces/interface-item';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { FavoriteService } from '../services/favorite.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})

export class ProductItemComponent implements OnInit, OnDestroy {

  @Input()
  public item: IProductItem;

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);


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

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy),
    ).subscribe();
  }

  public addToFavorite(): void {
    this.item.isFavorite = !this.item.isFavorite;
    if (this.item.isFavorite) {
      this._fService.pushItem(this.item);
    } else {
      this._fService.deleteItem(this.item.id);
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }


}
