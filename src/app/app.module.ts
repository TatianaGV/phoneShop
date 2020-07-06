import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { BasketListComponent } from './basket-list/basket-list.component';
import { MailLayoutComponent } from './mail-layout/mail-layout.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BasketProductItemComponent } from './basket-product-item/basket-product-item.component';
import { CoreModule } from './core/core/core.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalViewComponent } from './modal-view/modal-view.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    WishListComponent,
    BasketListComponent,
    MailLayoutComponent,
    ProductItemComponent,
    NavbarComponent,
    BasketProductItemComponent,
    ModalViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatGridListModule,
    HttpClientModule,
    CoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
