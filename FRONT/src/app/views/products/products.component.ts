import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FiltersService } from 'src/app/services/filters.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: any[] = [];

  constructor(
    public productService: ProductService,
    private filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: Product[]) => {
      this.products = res;
      console.log(res);
    });
  }
}
