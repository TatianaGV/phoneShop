import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public items: Observable<IProductItem []>;

  constructor(private firestore: AngularFirestore) {
    this.init();
  }

  public init(): void {
    this.items = this.firestore
      .collection('items')
      .snapshotChanges()
      .pipe(
        map((response) => {
          return response.map((item: any) => {
            return {
              ...item.payload.doc.data(),
              id: item.payload.doc.id,
            };
          });
        }),
        tap((resp) => {
          resp.forEach((item) => {
            const itemsIdFavorite = localStorage.getItem('favorite');
            const favorite = JSON.parse(itemsIdFavorite);
            if (favorite) {
              favorite.forEach((id) => {
                if (item.id === id) {
                  item.isFavorite = true;
                }
              });
            }

            const itemsIdCart = localStorage.getItem('cart');
            const cart = JSON.parse(itemsIdCart);
            if (cart) {
              cart.forEach((id) => {
                if (item.id === id) {
                  item.isCard = true;
                }
              });
            }
          });
        }),
      );
  }

  public getItems(): Observable<IProductItem []> {
    return this.items;
  }

}
