import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from '@core/services/products.service';
import { ToastUtilsService } from '@core/services/toast-utils.service';
import { of, throwError } from 'rxjs';
import { toastTypes } from '@core/utils/const';
import { transformDate } from '@core/utils/dateTransform';
import { ProductFormComponent } from 'app/pages/products/components/product-form/product-form.component';
import { ProductSelectedService } from 'app/pages/products/services/product-selected.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productsService: ProductsService;
  let toastUtilsService: ToastUtilsService;
  let router: Router;

  const date = new Date();
  const mockProduct = {
    id: '1',
    name: 'Product 1',
    description: 'Product 1 description',
    logo: '',
    date_release: date,
    date_revision: date,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [ProductsService, ProductSelectedService, ToastUtilsService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService);
    toastUtilsService = TestBed.inject(ToastUtilsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSend should call updateProduct if productSelected is not null', () => {
    const date = new Date();
    component.productSelected = {
      id: 'test-id',
      name: 'Test Name',
      description: 'Test Description',
      logo: 'Test Logo',
      date_release: date,
      date_revision: date,
    };
    const updateProductSpy = jest.spyOn(component, 'updateProduct');

    component.onSend();

    expect(updateProductSpy).toHaveBeenCalled();
  });

  it('validateId should show a toast and stop loading if there is an error', () => {
    const id = 'test-id';
    const verificationIdSpy = jest
      .spyOn(productsService, 'verificationId')
      .mockReturnValue(throwError(() => {}));

    component.validateId(id);

    expect(verificationIdSpy).toHaveBeenCalledWith;
  });

  it('should create product successfully', () => {
    const productServiceSpy = jest
      .spyOn(productsService, 'create')
      .mockReturnValue(of(mockProduct));
    const onBackSpy = jest.spyOn(component, 'onBack');
    const toastUtilsServiceSpy = jest.spyOn(toastUtilsService, 'callback');

    component.createProduct();

    expect(productServiceSpy).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
    expect(onBackSpy).toHaveBeenCalled();
    expect(toastUtilsServiceSpy).toHaveBeenCalledWith(
      toastTypes.SUCCESS,
      'Producto creado con éxito!'
    );
  });

  it('should handle error when creating product', () => {
    const productServiceSpy = jest
      .spyOn(productsService, 'create')
      .mockReturnValue(throwError(() => {}));
    const toastUtilsServiceSpy = jest.spyOn(toastUtilsService, 'callback');

    component.createProduct();

    expect(productServiceSpy).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
    expect(toastUtilsServiceSpy).toHaveBeenCalledWith(
      toastTypes.ERROR,
      `Error al crear el producto undefined`
    );
    expect(component.isLoading).toBe(false);
  });

  it('updateProduct should call productsService.update and navigate on success', () => {
    const updateSpy = jest
      .spyOn(productsService, 'update')
      .mockReturnValue(of(mockProduct));
    const navigateSpy = jest.spyOn(router, 'navigate');
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');

    component.updateProduct();

    expect(updateSpy).toHaveBeenCalledWith(component.form.getRawValue());
    expect(navigateSpy).toHaveBeenCalledWith(['/products'], {
      replaceUrl: true,
    });
    expect(callbackSpy).toHaveBeenCalledWith(
      toastTypes.SUCCESS,
      'Producto actualizado con éxito!'
    );
  });

  it('updateProduct should handle error and set isLoading to false', () => {
    jest.spyOn(productsService, 'update').mockReturnValue(throwError(() => {}));
    const callbackSpy = jest.spyOn(toastUtilsService, 'callback');

    component.updateProduct();

    expect(callbackSpy).toHaveBeenCalledWith(
      toastTypes.ERROR,
      `Error al actualizar el producto undefined`
    );
    expect(component.isLoading).toBeFalsy();
  });

  it('fillForm should populate form fields with productSelected data', () => {
    component.productSelected = mockProduct;

    component.fillForm();

    expect(component.form.get('id')!.value).toBe(mockProduct.id);
    expect(component.form.get('id')!.disabled).toBeTruthy();
    expect(component.form.get('name')!.value).toBe(mockProduct.name);
    expect(component.form.get('description')!.value).toBe(
      mockProduct.description
    );
    expect(component.form.get('logo')!.value).toBe(mockProduct.logo);

    const dateRelease = new Date(mockProduct.date_release);
    const dateRevision = new Date(mockProduct.date_revision);
    expect(component.form.get('date_release')!.value).toBe(
      transformDate(dateRelease)
    );
    expect(component.form.get('date_revision')!.value).toBe(
      transformDate(dateRevision)
    );
  });
});
