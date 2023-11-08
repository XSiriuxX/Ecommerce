import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  product: Product | null = null;
  productID: string | null = null;

  constructor(
    public productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.productID = param.get('id') || null;
    });
    this.getProduct();
  }

  getProduct() {
    if (this.productID) {
      this.productService
        .getProductDetail(this.productID)
        .subscribe((res: Product) => {
          this.product = res;
          console.log(res);
        });
    }
  }
}
