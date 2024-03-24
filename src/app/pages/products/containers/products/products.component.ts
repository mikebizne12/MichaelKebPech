import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductsService } from '@core/services/products.service';
import { defaultImageUrl, toastTypes } from '@core/utils/const';
import { isValidUrl } from '@core/utils/validators';
import { ProductData } from '@shared/interfaces/ProductData';
import { ProductSelectedService } from '../../services/product-selected.service';
import { ToastUtilsService } from '@core/services/toast-utils.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productFullList: ProductData[] = [];
  productList: ProductData[] = [];
  productToDelete: ProductData | null = null;
  searchText: string = '';
  productName: string = '';
  showModal: boolean = false;
  isLoading: boolean = false;
  hidePagination: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  @Output() confirmDelete = new EventEmitter<number>();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private productSelectedService: ProductSelectedService,
    private toastUtilsService: ToastUtilsService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.fetchProductList();
    this.productSelectedService.clearProductSelected();
  }

  fetchProductList(): void {
    this.isLoading = true;
    this.productsService.list().subscribe({
      next: (resp: ProductData[]) => {
        this.productFullList = resp;
        this.currentPage = 1;
        this.pageSize = 5;
        this.updateProductList();
      },
      error: () => {
        this.toastUtilsService.callback(
          toastTypes.ERROR,
          'Hubo un error al intentar realizar el proceso. Inténtelo más tarde.',
        );

        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onCreate(): void {
    this.router.navigate(['/products/create-edit/']);
  }

  sanitizeUrl(url: string): SafeStyle {
    if (isValidUrl(url)) return this.sanitizer.bypassSecurityTrustUrl(url);
    return defaultImageUrl;
  }

  handleDelete(product: ProductData): void {
    this.productName = product.name;
  }

  onUpdate(product: ProductData): void {
    this.productSelectedService.setProductSelected(product);
    this.router.navigate(['/products/create-edit/']);
  }

  onDelete(product: ProductData): void {
    this.productToDelete = product;
    this.showModal = true;
  }

  handleConfirm(confirm: boolean): void {
    if (confirm && this.productToDelete!.id !== null) {
      this.isLoading = true;
      this.productsService.delete(this.productToDelete!.id).subscribe({
        next: () => {
          this.fetchProductList();
          this.toastUtilsService.callback(
            toastTypes.SUCCESS,
            'Producto eliminado con éxito!',
          );
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
    this.productToDelete = null;
    this.showModal = false;
  }

  onChangePageSize(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newPageSize = parseInt(target.value, 10);
    const totalItems = this.productFullList.length;
    if (totalItems > newPageSize) {
      this.currentPage = 1;
    } else {
      const newPage = Math.ceil(
        (this.currentPage * this.pageSize) / newPageSize,
      );
      this.currentPage = newPage;
    }

    this.pageSize = newPageSize;
    this.updateProductList();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateProductList();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateProductList();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateProductList();
    }
  }

  private updateProductList(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.productList = this.productFullList.slice(startIndex, endIndex);
  }

  onValidateTableTrLength() {
    const tbodyElement = document.querySelector('#table tbody');
    const trElements = tbodyElement!.getElementsByTagName('tr');
    const numberOfTR = trElements.length;
    if (this.searchText.length > 0 && numberOfTR <= this.pageSize) {
      this.hidePagination = true;
    } else {
      this.hidePagination = false;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.productFullList.length / this.pageSize);
  }
}
