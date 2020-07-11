import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, forkJoin, ReplaySubject } from 'rxjs';
import { map, take, tap, takeUntil } from 'rxjs/operators';

import { IProductItem } from '../interfaces/interface-item';

import { ProductService } from './product.service';
import { CommonService } from './common.service';

export interface IOrderFromCash {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})

export class CartService implements OnDestroy {

  public items$: Observable<IProductItem>[] = [];

  public cartItemsIds: string[] = [];
  public cartItems: IProductItem[] = [];
  public dataFromCash: IOrderFromCash[] = [];

  private destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private _ProductService: ProductService,
    private _fb: AngularFirestore,
    private _CommonService: CommonService,
  ) {
    this._getCartDataFromCash();
    this._loadCartItems();
    this._joinCartItems();
  }

  public pushItem(item: IProductItem): void {
    this.cartItemsIds.push(item.id);
    this.cartItems.push(item);
    const data: IOrderFromCash = { id: item.id, count: item.count };
    this.dataFromCash.push(data);
    this.updateLocalStorage(this.dataFromCash);
  }

  public deleteItem(item: IProductItem): void {
    const index = this._findIndex(item);
    this.cartItems.splice(index, 1);
    this.dataFromCash.splice(index, 1);
    this.updateLocalStorage(this.dataFromCash);
  }

  public getCountItemsFromCart(): number {
    let count = 0;
    for (const data of this.cartItems) {
      count += data.count;
    }

    return count;
  }

  public getTotalPriceFromCart(): number {
    return this.cartItems.reduce<number>((sum, current) => {
      return sum + (current.price * current.count);
    }, 0);
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public updateLocalStorage(data: IOrderFromCash[]): void {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  private _getCartDataFromCash(): void {
    this.dataFromCash = this._CommonService.getDataFromCash('cart');
  }

  private _loadCartItems(): void {
    this._getIds();
    this.items$ = this._CommonService.loadDataFromDb(this.cartItemsIds);
  }

  private _joinCartItems(): void {
    forkJoin(this.items$)
      .pipe(
        map((items) => {
          return items.map((item) => {
            const data = this.dataFromCash
              .find((elem) => elem.id === item.id);
            item.count = data.count;

            return item;
          });
        }),
        takeUntil(this.destroy),
      )
      .subscribe((item) => {
        this.cartItems.push(...item);
      });
  }

  private _getIds(): void {
    for (const item of this.dataFromCash) {
      this.cartItemsIds.push(item.id);
    }
  }

  private _findIndex(item: IProductItem): number {
    for (let i = 0; i < this.dataFromCash.length; i++) {
      if (this.dataFromCash[i].id === item.id) {
        return i;
      }
    }
  }

}
