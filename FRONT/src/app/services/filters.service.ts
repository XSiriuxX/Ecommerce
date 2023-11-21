import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  products: Product[] = [];
  private selectedFilters: any = {};
  filtersChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  setProducts(products: Product[]): void {
    this.products = this.filterAndSortProducts();
    console.log(this.products);
  }

  setSelectedFilters(filters: any): void {
    this.selectedFilters = filters;
    console.log(filters);
  }

  getSelectedFilters(): any {
    return this.selectedFilters;
  }

  getAllProducts(): Product[] {
    return this.products;
  }

  filterAndSortProducts(): any[] {
    const { categories, minPrice, maxPrice, sortBy, ascending } =
      this.selectedFilters;

    // Aplicar filtros y ordenamiento usando this.selectedFilters
    let filteredProducts = this.products;

    if (categories && categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.some((category: any) =>
          product.categories.includes(category)
        )
      );
    }

    if (!isNaN(minPrice)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productPrice >= minPrice
      );
    }

    if (!isNaN(maxPrice)) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productPrice <= maxPrice
      );
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'name':
        filteredProducts = this.sortProductsByName(filteredProducts, ascending);
        break;
      case 'price':
        filteredProducts = this.sortProductsByPrice(
          filteredProducts,
          ascending
        );
        break;
      // Puedes agregar más casos según sea necesario
    }

    return filteredProducts;
  }

  private sortProductsByName(
    products: Product[],
    ascending: boolean = true
  ): Product[] {
    return products
      .slice()
      .sort((a, b) =>
        ascending
          ? a.productName.localeCompare(b.productName)
          : b.productName.localeCompare(a.productName)
      );
  }

  private sortProductsByPrice(
    products: Product[],
    ascending: boolean = true
  ): Product[] {
    return products
      .slice()
      .sort((a, b) =>
        ascending
          ? a.productPrice - b.productPrice
          : b.productPrice - a.productPrice
      );
  }
}
