import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, forkJoin } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { ProductService } from './product.service';
import { IProductItem } from '../interfaces/interface-item';


export interface IOrder {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})

export class CartService {

  public obsItems: Observable<IProductItem>[] = [];
  public cartItemsID: string[] = [];
  public cartItems: IProductItem[] = [];

  constructor(private _pService: ProductService,
              private firestore: AngularFirestore) {
    this._getInfoCart();
    this._getCartItems();
    this._joinCartItems();
  }

  public pushItem(itemId: string): void {
    this.cartItemsID.push(itemId);
    // const orderItem = { id: itemId, count: countItem };
    localStorage.setItem('cart', JSON.stringify(this.cartItemsID));
    console.log(this.cartItemsID);
  }

  public deleteItem(itemId: string): void {
    this.cartItemsID = this.cartItemsID.filter((item) => item !== itemId);
    localStorage.setItem('cart', JSON.stringify(this.cartItemsID));
    console.log(this.cartItemsID);
  }

  public getItemId(): string[] {
    return this.cartItemsID;
  }

  public getCountItemsFromCart(): number {
    return this.cartItemsID.length;
  }

  public getTotalPriceFromCart(): number {
    return this.cartItems.reduce<number>((sum, current) => {
      return sum + current.price;
    }, 0);
  }

  private _getInfoCart(): void {
    this.cartItemsID = JSON.parse(localStorage.getItem('cart')) || [];
  }

  private _getCartItems(): void {
    if (this.cartItemsID) {
      this.cartItemsID.forEach((item) => {
        const query = this.firestore
          .collection('items')
          .doc<IProductItem>(item)
          .snapshotChanges()
          .pipe(
            map((res) => res.payload.data()),
            take(1),
          );

        this.obsItems.push(query);
      });
    }
  }

  private _joinCartItems(): void {
    forkJoin(this.obsItems)
      .subscribe((item) => {
        this.cartItems.push(...item);
      });
  }

}
