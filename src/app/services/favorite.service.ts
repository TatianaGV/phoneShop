import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProductItem } from '../interfaces/interface-item';
import { map, take } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class FavoriteService {

  public favoriteItemsID: string[] = [];
  public obsItems: Observable<IProductItem>[] = [];
  public favoriteItems: IProductItem[] = [];

  constructor(private _pService: ProductService,
              private firestore: AngularFirestore) {
    this._getInfoFavorite();
    this._getFavoriteItems();
    this._joinFavoriteItems();
  }

  public pushItem(itemId: string): void {
    this.favoriteItemsID.push(itemId);
    localStorage.setItem('favorite', JSON.stringify(this.favoriteItemsID));
    console.log(this.favoriteItemsID);
  }

  public deleteItem(itemId: string): void {
    this.favoriteItemsID = this.favoriteItemsID.filter((item) => item !== itemId);
    localStorage.setItem('favorite', JSON.stringify(this.favoriteItemsID));
    console.log(this.favoriteItemsID);
  }

  public getItemId(): string[] {
    return this.favoriteItemsID;
  }

  public getCountItemsFromWishList(): number {
    return this.favoriteItemsID.length;
  }

  private _getInfoFavorite(): void {
    this.favoriteItemsID = JSON.parse(localStorage.getItem('favorite')) || [];
  }

  private _getFavoriteItems(): void {
    if (this.favoriteItemsID) {
      this.favoriteItemsID.forEach((item) => {
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

  private _joinFavoriteItems(): void {
    forkJoin(this.obsItems)
      .subscribe((item) => {
        this.favoriteItems.push(...item);
      });
  }

}
