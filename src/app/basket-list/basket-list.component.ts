import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';

import { ICustomer } from '../interfaces/interface-customer';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
})
export class BasketListComponent implements OnInit {

  public form: FormGroup;
  public customer: ICustomer;
  public numberPattern = '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$';

  @Input()
  public items: Observable<any []>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('basketItems').valueChanges();
  }

  public ngOnInit(): void {
    this.initFrom();
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.customer = {
      nameCustomer: this.form.value.nameCustomer,
      phoneNumberCustomer: this.form.value.phoneNumberCustomer,
      emailCustomer: this.form.value.emailCustomer,
      addressCustomer: this.form.value.addressCustomer,
      commentOnOrder: this.form.value.commentOnOrder,
    };
  }

  public initFrom(): void {
    this.form = new FormGroup({
      nameCustomer: new FormControl(null, [
        Validators.required,
      ]),
      phoneNumberCustomer: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ]),
      emailCustomer: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      addressCustomer: new FormControl(null, [
        Validators.required,
      ]),
      commentOnOrder: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

}
