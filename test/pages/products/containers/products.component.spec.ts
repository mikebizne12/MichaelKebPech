import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';
import { ToastUtilsService } from '@core/services/toast-utils.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from 'app/pages/products/containers/products/products.component';
import { ProductsService } from '@core/services/products.service';
import { ProductSelectedService } from 'app/pages/products/services/product-selected.service';
import { of, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { toastTypes } from '@core/utils/const';
import { ProductData } from '@shared/interfaces/ProductData';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let productsService: ProductsService;
  let productSelectedService: ProductSelectedService;
  let toastUtilsService: ToastUtilsService;
  let router: Router;
  let sanitizer: DomSanitizer;

  let fixture: ComponentFixture<ProductsComponent>;

  const date = new Date();
  const product: ProductData = {
    id: '1',
    name: 'Product 1',
    description: 'Product 1 description',
    logo: '',
    date_release: date,
    date_revision: date,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [ProductSelectedService, ToastUtilsService],
    }).compileComponents();
  });

  beforeEach(() => {
    productsService = TestBed.inject(ProductsService);
    toastUtilsService = TestBed.inject(ToastUtilsService);
    productSelectedService = TestBed.inject(ProductSelectedService);
    router = TestBed.inject(Router);
    sanitizer = TestBed.inject(DomSanitizer);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product list successfully', () => {
    const date = new Date();
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        logo: '',
        date_release: date,
        date_revision: date,
      },
    ];
    const listSpy = jest
      .spyOn(productsService, 'list')
      .mockReturnValue(of(mockProducts));

    component.fetchProductList();

    expect(component.isLoading).toBe(false);
    expect(component.productFullList).toEqual(mockProducts);
    expect(listSpy).toHaveBeenCalled();
  });

  it('should handle error when fetching product list', () => {
    jest.spyOn(productsService, 'list').mockReturnValue(throwError(() => {}));
    jest.spyOn(toastUtilsService, 'callback');

    component.fetchProductList();

    expect(component.isLoading).toBe(false);
    expect(toastUtilsService.callback).toHaveBeenCalledWith(
      toastTypes.ERROR,
      'Hubo un error al intentar realizar el proceso. Inténtelo más tarde.'
    );
  });

  it('should navigate to create-edit page', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onCreate();

    expect(navigateSpy).toHaveBeenCalledWith(['/products/create-edit/']);
  });

  it('should sanitize a valid URL', () => {
    const url = 'https://example.com/image.jpg';
    const result = component.sanitizeUrl(url);
    const expectedUrl = sanitizer.bypassSecurityTrustUrl(url);

    expect(result).toEqual(expectedUrl);
  });

  it('should return default image URL for invalid URL', () => {
    const defaultImageUrl = 'assets/default.webp';

    const url = 'invalid-url';
    const result = component.sanitizeUrl(url);

    expect(result).toBe(defaultImageUrl);
  });

  it('should set product name for deletion', () => {
    component.handleDelete(product);

    expect(component.productName).toBe('Product 1');
  });

  it('should set product selected and navigate to create-edit page', () => {
    const setProductSelectedSpy = jest.spyOn(
      productSelectedService,
      'setProductSelected'
    );
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onUpdate(product);

    expect(setProductSelectedSpy).toHaveBeenCalledWith(product);
    expect(navigateSpy).toHaveBeenCalledWith(['/products/create-edit/']);
  });

  it('onDelete should set productToDelete and showModal to true', () => {
    component.onDelete(product);

    expect(component.productToDelete).toEqual(product);
    expect(component.showModal).toBe(true);
  });

  it('handleConfirm should set isLoading to true and delete product', () => {
    component.productToDelete = product;
    const deleteSpy = jest
      .spyOn(productsService, 'delete')
      .mockReturnValue(of(true));

    component.handleConfirm(true);

    expect(component.isLoading).toBe(true);
    expect(deleteSpy).toHaveBeenCalledWith(product.id);
  });

  it('handleConfirm should reset productToDelete and showModal on cancel', () => {
    component.productToDelete = product;

    component.handleConfirm(false);

    expect(component.productToDelete).toBeNull();
    expect(component.showModal).toBe(false);
  });

  it('should go to the previous page and update product list', () => {
    component.currentPage = 2;
    component.previousPage();
    expect(component.currentPage).toBe(1);
  });
});
