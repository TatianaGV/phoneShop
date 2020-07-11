import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { map, tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IProductItem } from '../interfaces/interface-item';

@Injectable({
  providedIn: 'root',
})
export class CommonService {

  constructor(private _fb: AngularFirestore) { }

  public loadDataFromDb(data: string[]): Observable<IProductItem>[] {
    const items$: Observable<IProductItem>[] = [];
    if (data) {
      data.forEach((id) => {
        const query = this._fb
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
        items$.push(query);
      });
    }

    return items$;
  }

  public getDataFromCash(key: string): any {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

}
