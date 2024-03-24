import { Injectable } from '@angular/core';
import { ProductData } from '@shared/interfaces/ProductData';

@Injectable({
  providedIn: 'root',
})
export class ProductSelectedService {
  private productSelected: ProductData | null = null;

  constructor() {}

  setProductSelected(product: ProductData) {
    this.productSelected = product;
  }

  getProductSelected(): ProductData | null {
    return this.productSelected;
  }

  clearProductSelected() {
    this.productSelected = null;
  }
}
