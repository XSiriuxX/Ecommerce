import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin(form: NgForm): void {
    if (form.value.email === '' || form.value.password === '') {
      alert('Fill in all the fields.');
    } else {
      this.authService.logIn(form.value).subscribe(
        (res) => {
          form.reset();
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err.message);
        }
      );
    }
  }
}
