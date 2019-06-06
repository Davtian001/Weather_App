import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convert'
})
export class ConvertPipe implements PipeTransform {

  transform(value: number | string, convertType: string = 'm-to-km') {

    switch (convertType) {
      case 'm-to-km': return (+value / 1000).toFixed(1) + 'km';
      case 'km-to-m': return (+value * 1000).toFixed(1) + 'm';

      default:
        break;
    }
  }


}
