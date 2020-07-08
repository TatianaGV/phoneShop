import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

export interface IOrder {
  id: string;
  count: number;
}

@Injectable({
  providedIn: 'root',
})

export class CartService {

  public itemsId: string[] = [];
  //public itemsId: IOrder[] = [];

  constructor(private _pService: ProductService) {
    this.itemsId = JSON.parse(localStorage.getItem('cart')) || [];
  }

  public pushItem(itemId: string): void {
    this.itemsId.push(itemId);
    //const orderItem = { id: itemId, count: countItem };
    localStorage.setItem('cart', JSON.stringify(this.itemsId));
    console.log(this.itemsId);
  }

  public deleteItem(itemId: string): void {
    this.itemsId = this.itemsId.filter((item) => item !== itemId);
    localStorage.setItem('cart', JSON.stringify(this.itemsId));
    console.log(this.itemsId);
  }
  public getItemId(): string[] {
    return this.itemsId;
  }

  public getCountItemsFromCart(): number {
    return this.itemsId.length;
  }

  public getTotalPriceFromCart(): void {
    this._pService
      .getItems()
      .subscribe((items) => {
        return items.forEach((item) => {
          
        });
      });
  }

}
