import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'runtimeConvert'})
export class RuntimeConvertPipe implements PipeTransform {
  transform(value: number): any {
    let hours   = Math.floor(value / 60);
    let minutes = +((value / 60 % 2).toFixed(2).toString().split('.')[1]);

    if (minutes > 60) {
      minutes = minutes - 60;
      hours++;
    }

    if (minutes === 60) {
      minutes = 0;
      hours++;
    }

    return hours + ' h ' + minutes + ' min';
  }
}
