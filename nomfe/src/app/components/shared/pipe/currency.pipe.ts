import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

type DisplayType = 'code' | 'symbol' | 'symbol-narrow' | string | boolean;
@Pipe({
  name: 'customcurrency',
})
export class CustomCurrencyPipe extends CurrencyPipe implements PipeTransform {
  override transform(value: any, symbol?: string): any {
    if (value) {
      const number = value
        .toString()
        .replace(/,/g, '')
        .replace(new RegExp(<string>symbol, 'gi'), '');
      if (!isNaN(number)) {
        return super.transform(number, 'VND', symbol ?? '');
      }
    }
    return value;
  }
}
