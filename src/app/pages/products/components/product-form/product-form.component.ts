import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '@core/services/products.service';
import { ProductSelectedService } from '../../services/product-selected.service';
import { ProductData } from '@shared/interfaces/ProductData';
import { ToastUtilsService } from '@core/services/toast-utils.service';
import { toastTypes } from '@core/utils/const';
import { transformDate, transformDateAddYear } from '@core/utils/dateTransform';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit {
  productSelected: ProductData | null = null;
  form!: FormGroup;
  todayDate: Date = new Date();
  isLoading: boolean = false;
  minDate: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private productSelectedService: ProductSelectedService,
    private toastUtilsService: ToastUtilsService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.productSelected = this.productSelectedService.getProductSelected();
    this.buildForm();
    this.minDate = transformDate(this.todayDate);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: [transformDate(this.todayDate), Validators.required],
      date_revision: [
        { value: transformDateAddYear(this.todayDate, 1), disabled: true },
        Validators.required,
      ],
    });

    this.form.get('date_release')?.valueChanges.subscribe((value) => {
      const date = new Date(value);
      this.form.get('date_revision')?.setValue(transformDateAddYear(date, 1));
    });

    if (this.productSelected) this.fillForm();
  }

  fillForm() {
    this.form.get('id')!.setValue(this.productSelected!.id);
    this.form.get('id')!.disable();
    this.form.get('name')!.setValue(this.productSelected!.name);
    this.form.get('description')!.setValue(this.productSelected!.description);
    this.form.get('logo')!.setValue(this.productSelected!.logo);

    const dateRelease = new Date(this.productSelected!.date_release);
    const dateRevision = new Date(this.productSelected!.date_revision);

    this.form.get('date_release')?.setValue(transformDate(dateRelease));
    this.form.get('date_revision')?.setValue(transformDate(dateRevision));
  }

  onReset() {
    this.form.reset();
    if (this.productSelected?.id)
      this.form.get('id')?.setValue(this.productSelected!.id);
  }

  onSend() {
    this.isLoading = true;
    const id = this.form.get('id')!.value;
    this.productSelected?.id ? this.updateProduct() : this.validateId(id);
  }

  validateId(id: string) {
    this.productsService.verificationId(id).subscribe({
      next: (isValid: boolean) => {
        if (!isValid) {
          this.createProduct();
        } else {
          this.toastUtilsService.callback(
            toastTypes.WARNING,
            'El ID no es válido',
          );
          this.isLoading = false;
        }
      },
      error: (error) => {
        this.toastUtilsService.callback(
          toastTypes.ERROR,
          `Error al validar el ID ${error}`,
        );

        this.isLoading = false;
      },
    });
  }

  createProduct() {
    this.productsService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.onBack();
        this.toastUtilsService.callback(
          toastTypes.SUCCESS,
          'Producto creado con éxito!',
        );
      },
      error: (error) => {
        this.toastUtilsService.callback(
          toastTypes.ERROR,
          `Error al crear el producto ${error}`,
        );
        this.isLoading = false;
      },
    });
  }

  updateProduct() {
    this.productsService.update(this.form.getRawValue()).subscribe({
      next: () => {
        this.onBack();
        this.toastUtilsService.callback(
          toastTypes.SUCCESS,
          'Producto actualizado con éxito!',
        );
      },
      error: (error) => {
        this.toastUtilsService.callback(
          toastTypes.ERROR,
          `Error al actualizar el producto ${error}`,
        );
        this.isLoading = false;
      },
    });
  }

  onBack() {
    this.ngZone.run(() => {
      this.router.navigate(['/products'], { replaceUrl: true });
    });
  }
}
