import { Component, HostBinding } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  showCart: boolean = false;

  constructor(public darkModeService: DarkModeService) {}

  toggleCart() {
    this.showCart = !this.showCart;
  }

  toggleDarkMode() {
    this.darkModeService.darkMode.set(!this.darkModeService.darkMode());
  }
}
