import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

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

  constructor() { }

  public ngOnInit(): void {
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

}
