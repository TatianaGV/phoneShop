import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FavoriteService {

  public itemsId: string[] = [];

  constructor() {
    this.itemsId = JSON.parse(localStorage.getItem('favorite')) || [];
  }

  public pushItem(itemId: string): void {
    this.itemsId.push(itemId);
    localStorage.setItem('favorite', JSON.stringify(this.itemsId));
    console.log(this.itemsId);
  }

  public deleteItem(itemId: string): void {
    this.itemsId = this.itemsId.filter((item) => item !== itemId);
    localStorage.setItem('favorite', JSON.stringify(this.itemsId));
    console.log(this.itemsId);
  }

  public getItemId(): string[] {
    return this.itemsId;
  }

  public getCountItemsFromWishList(): number {
    return this.itemsId.length;
  }

}
