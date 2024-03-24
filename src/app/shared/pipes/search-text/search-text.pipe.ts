import { Pipe, PipeTransform } from '@angular/core';
import { ProductData } from '@shared/interfaces/ProductData';

@Pipe({
  name: 'searchText',
})
export class SearchTextPipe implements PipeTransform {
  transform(items: ProductData[], searchText: string): ProductData[] {
    if (!items || !searchText) {
      return items;
    }

    return items.filter((item) => {
      return (
        item.id.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase())
      );
    });
  }
}
