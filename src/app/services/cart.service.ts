import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, forkJoin } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { IProductItem } from '../interfaces/interface-item';

import { ProductService } from './product.service';


export interface IOrder {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})

export class CartService {

  public obsItems: Observable<IProductItem>[] = [];
  public cartItemsIds: string[] = [];
  public cartItems: IProductItem[] = [];

  constructor(private _pService: ProductService,
              private firestore: AngularFirestore) {
    this._getInfoCart();
    this._getCartItems();
    this._joinCartItems();
  }

  public pushItem(item: IProductItem): void {
    this.cartItemsIds.push(item.id);
    this.cartItems.push(item);
    // const orderItem = { id: itemId, count: countItem };
    localStorage.setItem('cart', JSON.stringify(this.cartItemsIds));
    console.log(this.cartItemsIds);
  }

  public deleteItem(itemId: string): void {
    const index = this.cartItemsIds.indexOf(itemId);
    console.log(index);
    this.cartItemsIds.splice(index, 1);
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItemsIds));
    console.log(this.cartItemsIds);
  }

  public getCountItemsFromCart(): number {
    return this.cartItemsIds.length;
  }

  public getTotalPriceFromCart(): number {
    return this.cartItems.reduce<number>((sum, current) => {
      return sum + current.price;
    }, 0);
  }

  private _getInfoCart(): void {
    this.cartItemsIds = JSON.parse(localStorage.getItem('cart')) || [];
  }

  private _getCartItems(): void {
    if (this.cartItemsIds) {
      this.cartItemsIds.forEach((id) => {
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

  private _joinCartItems(): void {
    forkJoin(this.obsItems)
      .pipe(
        map((items) => {
          return items.map((item) => {
            console.log(item);

            return item;
          });
        }),
      )
      .subscribe((item) => {
        this.cartItems.push(...item);
      });
  }

}
