import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DocumentChangeAction } from '@angular/fire/firestore/interfaces';

import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public items$: Observable<IProductItem []>;

  constructor(private firestore: AngularFirestore) {
    this.init();
  }

  public init(): void {
    this.items$ = this.firestore
      .collection<IProductItem>('items')
      .snapshotChanges()
      .pipe(
        map((response) => {
          return this.makeResponse(response);
        }),
        tap((resp) => {
          return this.makeFavoriteItems(resp);
        }),
      );
  }

  public makeResponse(response: DocumentChangeAction<IProductItem>[]): IProductItem[] {
    return response.map((item: DocumentChangeAction<IProductItem>) => {
      return {
        ...item.payload.doc.data(),
        id: item.payload.doc.id,
      };
    });
  }

  public makeFavoriteItems(resp: IProductItem[]): IProductItem[] {
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
    });

    return resp;
  }

}
