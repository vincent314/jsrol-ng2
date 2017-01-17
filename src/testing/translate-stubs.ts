import {PipeTransform, Pipe, Injectable} from '@angular/core';
@Pipe({
  name:'translate'
})
@Injectable()
export class TranslatePipe implements PipeTransform{
  transform(value: any, ...args: any[]): any {
    return 'TRANSLATION';
  }

}
