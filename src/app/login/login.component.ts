import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginError: string = '';
  registrationError: string = '';

  form: FormGroup = this.fb.group({
    username: [''],
    password: [''],
  });

  registrationForm: FormGroup = this.fb.group({
    newUsername: [''],
    newPassword: [''],
    lastName: [''],
    firstName: [''],
  });

  public showRegistration = false;

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  submit() {
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .subscribe(
        (response) => {
          this.authService.getUser(response).subscribe((response) => {});
        },
        (error) => {
          if (error.status === 403) {
            this.loginError = 'Invalid email or password';
          }
          if (error.status === 400) {
            this.loginError = 'Email must be an email';
          }
        }
      );
  }

  register() {
    this.authService
      .registration(
        this.registrationForm.value.newUsername,
        this.registrationForm.value.newPassword,
        this.registrationForm.value.lastName,
        this.registrationForm.value.firstName
      )
      .subscribe(
        (response) => {
          this.authService.getUser(response).subscribe((response) => {});
        },
        (error) => {
          if (error.status === 403) {
            this.registrationError = 'User with this email already exists';
          }
        }
      );
  }
}
