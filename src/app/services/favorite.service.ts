import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, take, tap, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';

import { ProductService } from './product.service';
import { CommonService } from './common.service';


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
    private _CommonService: CommonService,
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
    this.favoriteItemsIds = this._CommonService.getDataFromCash('favorite');
  }

  private _loadFavoriteItems(): void {
    this.items$ = this._CommonService.loadDataFromDb(this.favoriteItemsIds);
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
