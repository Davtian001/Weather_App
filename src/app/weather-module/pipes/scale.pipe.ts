import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scale'
})
export class ScalePipe implements PipeTransform {

  transform(value: any, scale: string = 'celcius', fixed: number = 0): any {

    switch (scale) {
      case 'celcius':
        const element = document.createElement('span')
        element.innerHTML = value && (value - 273.1).toFixed(fixed) + '&#8451;'
        return element.textContent;

      default:
        break;
    }

  }

}
