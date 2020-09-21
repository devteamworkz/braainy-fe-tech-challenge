import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(objects: object[], property: string, searchValue: string): object[] {
    return objects.filter((b) => b[property].toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
  }
}
