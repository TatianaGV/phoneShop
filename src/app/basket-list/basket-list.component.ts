import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Customer } from '../interface';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
})
export class BasketListComponent implements OnInit {

  public form: FormGroup;
  public customer: Customer;

  constructor() { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      nameCustomer: new FormControl(null, [
        Validators.required,
      ]),
      phoneNumberCustomer: new FormControl(null, [
        Validators.required,
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

  public submit() {
    this.customer = {
      nameCustomer: this.form.value.nameCustomer,
      phoneNumberCustomer: this.form.value.phoneNumberCustomer,
      emailCustomer: this.form.value.emailCustomer,
      addressCustomer: this.form.value.addressCustomer,
      commentOnOrder: this.form.value.commentOnOrder,
    };
  }

}
