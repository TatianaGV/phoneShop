import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { IProductItem } from '../interfaces/interface-item';
import { ModalViewComponent } from '../modal-view/modal-view.component';
import { DataBaseService } from '../services/data-base.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})

export class ProductItemComponent implements OnInit, OnDestroy {

  @Input()
  public item: IProductItem;

  constructor(public dialog: MatDialog,
              private service: DataBaseService) { }

  public ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ModalViewComponent, {
      width: '500px',
      data: { item: this.item },
    });

    // takeUntil
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public addToFavorite(): void {
    this.service.addItemToWishList(this.item);
    this.item.isFavorite = true;
  }

  public ngOnDestroy(): void {}

}
