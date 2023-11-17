import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  filterCounter = 0;
  reset = false;
  show = false;
  counter = 0;

  filterItems = [
    { label: 'Phone calls', checked: false },
    { label: 'Appointments', checked: false },
    { label: 'Email', checked: false },
    { label: 'Tasks', checked: false },
    { label: 'Letters', checked: false },
    { label: 'Campaign Response', checked: false },
  ];

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  isOpen() {
    return this.show === true;
  }

  count(item: any) {
    item.checked = !item.checked;
    this.counter += item.checked ? 1 : -1;
    this.filterCounter = this.counter;
  }
}
