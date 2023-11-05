import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() products: Product[] = [];

  ngOnInit() {
    this.products && console.log(this.products);
  }
}
