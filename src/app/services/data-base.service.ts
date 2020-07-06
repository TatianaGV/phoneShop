import { Injectable, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IProductItem } from '../interfaces/interface-item';


@Injectable({ providedIn: 'root' })
export class DataBaseService {

  public itemsCart: IProductItem[] = [];
  public itemsWishList: IProductItem[] = [];
  public item: IProductItem;


  constructor(public firestore: AngularFirestore) {
  }

  public addItemToCart(item: IProductItem): void {
    this.firestore.collection('basketItems').add(item);
    this.itemsCart.push(item);
  }

  public addItemToWishList(item: IProductItem): void {
    this.firestore.collection('wishItems').add(item);
    this.itemsWishList.push(item);
  }

  public getCountItemsFromCart(): number {
    return this.itemsCart.length;
  }

  public getCountItemsFromWishList(): number {
    return this.itemsWishList.length;
  }

  public getTotalPriceFromCart(): number {
    return this.itemsCart.reduce<number>((sum, current) => {
      return sum + current.price;
    }, 0);
  }

}
