import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderBy', pure: false})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string[]): any[] {
    array.sort((a: any, b: any) => {

      let index:number=0;
      let result:number=0;
      while (result===0 && field.length>index){
        result = this.compare(a[field[index]], b[field[index]]);
        index++;
      }
      return result;
    });
    return array;
  }

  private compare(a:any,b:any):number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

}
