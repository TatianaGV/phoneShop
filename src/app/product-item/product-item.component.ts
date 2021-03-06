import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { AngularFirestore } from '@angular/fire/firestore';

import { ReplaySubject } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { FavoriteService } from '../services/favorite.service';
import { ProductService } from '../services/product.service';


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
              private _favoriteService: FavoriteService,
              private _productService: ProductService) { }

  public ngOnInit(): void {
  }

  public openDialog(): void {
    this.dialog.open(ModalViewComponent, {
      width: '500px',
      height: '250px',
      data: { item: this.item },
    });
  }

  public addToFavorite(): void {
    this.item.isFavorite = !this.item.isFavorite;
    if (this.item.isFavorite) {
      this._favoriteService.pushItem(this.item);
    } else {
      this._favoriteService.deleteItem(this.item.id);
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }


}
