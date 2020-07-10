import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

export class CounterControlComponent implements ControlValueAccessor {

  private _value: number = 1;
  public isDisabled = false;

  constructor() { }

  public set value(val: number) {
    if (val !== undefined && this._value !== val) {
      this._value = val;
      this.onChange(this._value);
    }
  }

  public get value(): number {
    return this._value;
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

}
