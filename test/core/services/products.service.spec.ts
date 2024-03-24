import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductData } from '@shared/interfaces/ProductData';
import { ProductsService } from '@core/services/products.service';
import { ApiService } from '@core/http/api.service';
import { environment } from 'environments/environment';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService, ApiService],
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list products', () => {
    const date = new Date();
    const testData: ProductData[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        logo: '',
        date_release: date,
        date_revision: date,
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Product 2 description',
        logo: '',
        date_release: date,
        date_revision: date,
      },
    ];
    service.list().subscribe((products) => {
      expect(products).toEqual(testData);
    });

    const req = httpTestingController.expectOne(
      `${environment.url_base}bp/products`
    );

    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should verification id', () => {
    service.verificationId('2').subscribe((isValid) => {
      expect(isValid).toEqual(true);
    });

    const req = httpTestingController.expectOne(
      `${environment.url_base}bp/products/verification?id=2`
    );

    expect(req.request.method).toEqual('GET');
  });

  it('should create a product', () => {
    const date = new Date();
    const testData: ProductData = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      logo: '',
      date_release: date,
      date_revision: date,
    };

    service.create(testData).subscribe((product) => {
      expect(product).toEqual(testData);
    });

    const req = httpTestingController.expectOne(
      `${environment.url_base}bp/products`
    );

    expect(req.request.method).toEqual('POST');
    req.flush(testData)
  });

  it('should update a product', () => {
    const date = new Date();
    const testData: ProductData = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      logo: '',
      date_release: date,
      date_revision: date,
    };

    service.update(testData).subscribe((product) => {
      expect(product).toEqual(testData);
    });

    const req = httpTestingController.expectOne(
      `${environment.url_base}bp/products`
    );

    expect(req.request.method).toEqual('PUT');
    req.flush(testData)
  });

  it('should delete a product', () => {
    service.delete('2').subscribe((response) => {
      expect(response).toEqual('Product successfully removed');
    });

    const req = httpTestingController.expectOne(
      `${environment.url_base}bp/products?id=2`
    );

    expect(req.request.method).toEqual('DELETE');
  });
});
