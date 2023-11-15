import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable()
export class CartService {
  API_URL: string = `${environment.API_URL}/user/cart`;
  constructor(private http: HttpClient) {}

  getProductsCart(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}/${id}`).pipe(
      tap((res) => {
        return res;
      })
    );
  }

  addProduct(newproduct: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, newproduct).pipe(
      tap((res) => {
        return res;
      })
    );
  }
}
