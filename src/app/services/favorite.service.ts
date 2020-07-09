import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, take, tap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';

import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root',
})

export class FavoriteService {

  public favoriteItemsIds: string[] = [];
  public obsItems: Observable<IProductItem>[] = [];
  public favoriteItems: IProductItem[] = [];

  constructor(private _pService: ProductService,
              private firestore: AngularFirestore) {
    this._getFavoriteDataFromCash();
    this._loadFavoriteItems();
    this._joinFavoriteItems();
  }

  public pushItem(item: IProductItem): void {
    this.favoriteItemsIds.push(item.id);
    this.favoriteItems.push(item);
    localStorage.setItem('favorite', JSON.stringify(this.favoriteItemsIds));
    console.log(this.favoriteItemsIds);
  }

  public deleteItem(itemId: string): void {
    const index = this.favoriteItemsIds.indexOf(itemId);
    console.log(index);
    this.favoriteItemsIds.splice(index, 1);
    this.favoriteItems.splice(index, 1);
    localStorage.setItem('favorite', JSON.stringify(this.favoriteItemsIds));
    console.log(this.favoriteItemsIds);
  }

  public getCountItemsFromWishList(): number {
    return this.favoriteItemsIds.length;
  }

  private _getFavoriteDataFromCash(): void {
    this.favoriteItemsIds = JSON.parse(localStorage.getItem('favorite')) || [];
  }

  private _loadFavoriteItems(): void {
    if (this.favoriteItemsIds) {
      this.favoriteItemsIds.forEach((id) => {
        const query = this.firestore
          .collection('items')
          .doc<IProductItem>(id)
          .snapshotChanges()
          .pipe(
            map((res) => res.payload.data()),
            tap((res) => {
              res.id = id;
            }),
            take(1),
          );
        this.obsItems.push(query);
      });
    }
  }

  private _joinFavoriteItems(): void {
    forkJoin(this.obsItems)
      .pipe(
        map((items) => {
          return items.map((item) => {
            console.log(item);
            item.isFavorite = true;

            return item;
          });
        }),
      )
      .subscribe((item) => {
        this.favoriteItems.push(...item);
      });
  }

}
