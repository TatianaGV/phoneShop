import { Component, OnInit, Inject, Input } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IProductItem } from '../interfaces/interface-item';
import { DataBaseService } from '../services/data-base.service';

export interface IModelViewDialogData {
  item: IProductItem;
}

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss'],
})
export class ModalViewComponent implements OnInit {

  @Input()
  public countItem: number = 1;

  public item: IProductItem;

  constructor(private dialogRef: MatDialogRef<ModalViewComponent>,
              @Inject(MAT_DIALOG_DATA) private data: IModelViewDialogData,
              private service: DataBaseService) {
    this.item = data.item;
  }

  public ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

  public addItemToCart(): void {
    this.item.count = this.countItem;
    this.service.addItemToCart(this.item);
    this.dialogRef.close();
  }

}
