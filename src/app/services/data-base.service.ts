import { Injectable, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IProductItem } from '../interfaces/interface-item';


@Injectable({ providedIn: 'root' })

export class DataBaseService {

  public itemsCart: IProductItem[] = [];
  public item: IProductItem;

  constructor(public firestore: AngularFirestore) {}


  public getTotalPriceFromCart(): number {
    return this.itemsCart.reduce<number>((sum, current) => {
      return sum + current.price;
    }, 0);
  }

}
