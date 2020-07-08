import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { ICustomer } from '../interfaces/interface-customer';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { IProductItem } from '../interfaces/interface-item';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.scss'],
})

export class BasketListComponent implements OnInit {

  public form: FormGroup;
  public customer: ICustomer;
  public numberPattern = '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$';
  public items: IProductItem[] = [];
  public itemsCartId: string[] = [];

  constructor(private _pService: ProductService,
              private _cService: CartService) {}

  public ngOnInit(): void {
    this.initFrom();
    this.initCart();
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

  public initCart(): void {
    this._pService
      .getItems()
      .subscribe((items) => {
        this.itemsCartId = this._cService.getItemId();
        this.items = items.filter((item) => {
          return this.itemsCartId.indexOf(item.id) > -1;
        });
      });
  }

  public removeItem(id: string): void {
    this._cService.deleteItem(id);
  }

}
