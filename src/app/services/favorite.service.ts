import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, take, tap, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';

import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root',
})

export class FavoriteService implements OnDestroy {

  public items$: Observable<IProductItem>[] = [];

  public favoriteItemsIds: string[] = [];
  public favoriteItems: IProductItem[] = [];

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _ProductService: ProductService,
    private _fb: AngularFirestore,
  ) {
    this._getFavoriteDataFromCash();
    this._loadFavoriteItems();
    this._joinFavoriteItems();
  }

  public pushItem(item: IProductItem): void {
    this.favoriteItemsIds.push(item.id);
    this.favoriteItems.push(item);
    this.updateLocalStorage(this.favoriteItemsIds);
  }

  public deleteItem(itemId: string): void {
    const index = this.favoriteItemsIds.indexOf(itemId);
    this.favoriteItemsIds.splice(index, 1);
    this.favoriteItems.splice(index, 1);
    this.updateLocalStorage(this.favoriteItemsIds);
  }

  public getCountItemsFromWishList(): number {
    return this.favoriteItemsIds.length;
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public updateLocalStorage(data: string[]): void {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  private _getFavoriteDataFromCash(): void {
    this.favoriteItemsIds = JSON.parse(localStorage.getItem('favorite')) || [];
  }

  private _loadFavoriteItems(): void {
    if (this.favoriteItemsIds) {
      this.favoriteItemsIds.forEach((id) => {
        const query = this._fb
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
        this.items$.push(query);
      });
    }
  }

  private _joinFavoriteItems(): void {
    forkJoin(this.items$)
      .pipe(
        map((items) => {
          return items.map((item) => {
            item.isFavorite = true;

            return item;
          });
        }),
        takeUntil(this.destroy),
      )
      .subscribe((item) => {
        this.favoriteItems.push(...item);
      });
  }

}
