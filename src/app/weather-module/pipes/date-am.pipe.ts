import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAM'
})
export class DateAMPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(value)
    return date.getHours() + ":" + date.getMinutes() + date.getSeconds()
  }

}
