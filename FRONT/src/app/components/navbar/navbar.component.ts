import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showCart: boolean = false;

  toggleCart() {
    this.showCart = !this.showCart;
  }
}
