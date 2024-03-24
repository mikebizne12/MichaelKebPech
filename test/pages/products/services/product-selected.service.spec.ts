import { TestBed } from '@angular/core/testing';
import { ProductSelectedService } from 'app/pages/products/services/product-selected.service';

describe('ProductSelectedService', () => {
  let service: ProductSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
