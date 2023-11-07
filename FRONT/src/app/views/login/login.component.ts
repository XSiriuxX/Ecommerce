import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm): void {
    if (form.value.email === '' || form.value.password === '') {
      alert('Fill in all the fields.');
    } else {
      this.authService.logIn(form.value).subscribe(
        (res) => {
          console.log('logueado');
          form.reset();
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }
}
