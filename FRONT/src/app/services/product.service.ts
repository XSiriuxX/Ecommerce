import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable()
export class ProductService {
  API_URL: string = `${environment.API_URL}/product`;
  private products: any[] = [];

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  getProductDetail(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}/${id}`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  getFilteredProducts(selectedCategories: string[]): any[] {
    // Implementa la lógica para filtrar productos basados en categorías seleccionadas
    if (selectedCategories.length === 0) {
      // Si no hay categorías seleccionadas, devuelve todos los productos
      return this.products;
    } else {
      // Filtra los productos por categorías seleccionadas
      return this.products.filter((product) =>
        product.categories.some((category: any) =>
          selectedCategories.includes(category)
        )
      );
    }
  }
}
