import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { ProductData } from '@shared/interfaces/ProductData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(public apiService: ApiService) {}

  list(): Observable<ProductData[]> {
    return this.apiService.get<ProductData[]>('bp/products');
  }

  verificationId(id: string): Observable<boolean> {
    return this.apiService.get('bp/products/verification?id=' + id);
  }

  create(data: ProductData): Observable<ProductData> {
    return this.apiService.post('bp/products', data);
  }

  update(data: ProductData): Observable<ProductData> {
    return this.apiService.put('bp/products', data);
  }

  delete(id: string): Observable<boolean> {
    return this.apiService.delete('bp/products?id=' + id);
  }
}
