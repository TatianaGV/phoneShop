import { Component, forwardRef, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-control-access',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CounterControlComponent),
    multi: true,
  }],
  templateUrl: './counter-control.component.html',
  styleUrls: ['./counter-control.component.scss'],
})

export class CounterControlComponent implements OnInit, ControlValueAccessor {

  @ViewChild('input', { static: true })
  public inputEl: ElementRef;

  private _value: number = 1;

  constructor() {
  }

  public set value(val: number) {
    if (val !== undefined && this._value !== val) {
      this._value = +val;
      //
      if (this._value > 0) {
        this.onChange(this._value);
      }
    }
  }

  public get value(): number {
    return this._value;
  }

  public ngOnInit(): void {
    fromEvent(this.inputEl.nativeElement, 'keydown')
      .pipe()
      .subscribe((e: KeyboardEvent) => {
        const keyCode = ['Backspace', 'Delete', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
        const key = e.key;
        const code = e.code;
        const numbersRegex = this.value ? /\d/ : /[1-9]/;
        const isCorrect = !!key.match(numbersRegex);

        if (keyCode.indexOf(code) === -1 && !isCorrect) {
          e.preventDefault();
        } else {
          if (code === 'ArrowUp') {
            this.increaseValue();
            e.preventDefault();
          } else if (code === 'ArrowDown') {
            this.decreaseValue();
            e.preventDefault();
          }
        }
      });
  }

  public onChange = (val: number) => {};

  public onTouched = () => {};

  public writeValue(val: number): void {
    this._value = val;
  }

  public registerOnChange(fn: (val: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public decreaseValue(): void {
    if (this.value > 1) {
      this.value--;
    }
  }

  public increaseValue(): void {
    this.value++;
  }

  public onBlur(): void {
    if (this.value === 0) {
      this.value = 1;
    }
  }

}
