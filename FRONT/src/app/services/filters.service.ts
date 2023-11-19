import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  products: Product[] = [];

  constructor() {}

  getAllProducts(): Product[] {
    return this.products;
  }

  filterAndSortProducts(
    categories: string[],
    minPrice: number,
    maxPrice: number,
    sortBy: string = 'name',
    ascending: boolean = true
  ): any[] {
    // Aplicar filtros
    let filteredProducts = this.products;

    if (categories && categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.some((category) => product.categories.includes(category))
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
      case '':
        filteredProducts;
        break;
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
