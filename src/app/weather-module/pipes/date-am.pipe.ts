import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAM'
})
export class DateAMPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value).toDateString();
    return date.slice(0, date.lastIndexOf(' 2'));
    // .toLocaleString()
    // .toDateString()
  }

}
