import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortTitle',
  standalone: true
})
export class ShortTitlePipe implements PipeTransform {

  transform(value: String): String {
   if(!value) return "";
   if(value.length>26)
   {
    value = value.slice(0,26);
    value += "...";
    return value;
   }
   return value;
  }

}
