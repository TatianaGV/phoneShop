import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {

  @Input()
  public items: Observable<any []>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('wishItems').valueChanges();
  }

  public ngOnInit(): void {
  }

}
