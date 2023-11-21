import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  categories: any[] = [];
  selectedCategories: string[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(
    public categoryService: CategoryService,
    public filtersService: FiltersService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = res.map((category: any) => ({
        ...category,
        selected: false,
      }));
    });
  }

  applyFilters() {
    // Obtener solo las categorías seleccionadas
    this.selectedCategories = this.categories
      .filter((category) => category.selected)
      .map((category) => category.categoryName);

    this.filtersService.setSelectedFilters({
      categories: this.selectedCategories,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });

    // Obtener los productos filtrados del servicio y actualizar la vista
    this.filtersService.filterAndSortProducts();
  }

  resetFilters() {
    this.categories.forEach((category) => (category.selected = false));
    this.applyFilters();
  }
}
