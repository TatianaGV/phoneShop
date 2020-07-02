import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { BasketListComponent } from './basket-list/basket-list.component';
import { WishListComponent } from './wish-list/wish-list.component';


const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'basket', component: BasketListComponent },
  { path: 'wish', component: WishListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
