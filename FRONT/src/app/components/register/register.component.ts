import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onRegister(form: NgForm): void {
    if (
      form.value.eusername === '' ||
      form.value.email === '' ||
      form.value.password === ''
    ) {
      alert('Fill in all the fields.');
    } else {
      this.authService.register(form.value).subscribe((res) => {
        console.log('registrado');
        form.reset();
      });
    }
  }
}
