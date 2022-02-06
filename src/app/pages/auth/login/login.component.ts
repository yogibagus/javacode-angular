import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from "src/app/service/auth.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // variable - default false
  showPassword: boolean = false;
  loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // check if have login or not
    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/dashboard');
    }

    this.createLoginForm()

  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),

    });
  }

  // click event function toggle
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  get alert() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.authService.authLogin(body)
      .pipe(first())
      .subscribe({
        next: (data) => {

        },
        error: (e) => console.error(e)
      });
  }

}
