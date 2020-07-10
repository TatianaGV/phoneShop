import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, forkJoin, ReplaySubject } from 'rxjs';
import { map, take, tap, takeUntil } from 'rxjs/operators';

import { IProductItem } from '../interfaces/interface-item';

import { ProductService } from './product.service';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root',
})

export class CartService implements OnDestroy {

  public items$: Observable<IProductItem>[] = [];

  public cartItemsIds: string[] = [];
  public cartItems: IProductItem[] = [];

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
    this.updateLocalStorage(this.cartItemsIds);
  }

  public deleteItem(itemId: string): void {
    const index = this.cartItemsIds.indexOf(itemId);
    this.cartItemsIds.splice(index, 1);
    this.cartItems.splice(index, 1);
    this.updateLocalStorage(this.cartItemsIds);
  }

  public getCountItemsFromCart(): number {
    return this.cartItemsIds.length;
  }

  public getTotalPriceFromCart(): number {
    return this.cartItems.reduce<number>((sum, current) => {
      return sum + current.price;
    }, 0);
  }

  public ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public updateLocalStorage(data: string[]): void {
    localStorage.setItem('cart', JSON.stringify(data));
  }

  private _getCartDataFromCash(): void {
    this.cartItemsIds = this._CommonService.getDataFromCash('cart');
  }

  private _loadCartItems(): void {
    this.items$ = this._CommonService.loadDataFromDb(this.cartItemsIds);
  }

  private _joinCartItems(): void {
    forkJoin(this.items$)
      .pipe(
        map((items) => {
          return items.map((item) => {
            return item;
          });
        }),
        takeUntil(this.destroy),
      )
      .subscribe((item) => {
        this.cartItems.push(...item);
      });
  }

}
