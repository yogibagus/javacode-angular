import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { Auth } from "src/app/models/auth.model";
import Swal from 'sweetalert2/dist/sweetalert2.js';
const baseUrl = 'api/'
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public auth?: Observable<Auth>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  authLogin(data: any): Observable<any> {
    return this.http.post<Auth>(`${baseUrl}auth/login/`, data).pipe(catchError(this.handleError), map(data => {
      console.log('tes');
      if (data.status_code == 200) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(data.data.user));


        console.log(localStorage.getItem('currentUser'));
        //console.log(data);
        this.router.navigate(['/dashboard']);
        this.alertToast('success', 'Login berhasil');
      }

      if (data.status_code == 422) {
        this.alertToast('error', 'Password salah');
      }
      return data;
    }));
  }


  logout(): void {
    localStorage.clear();
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser')
    this.alertToast('error', 'Anda telah berhasil logout');
    // this.userSubject.next();
    //this.http.get(`${api}auth/logout`);
    this.router.navigate(['/']);
  }


  alertToast(icon: string, title: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }



  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown Error !';
    if (error.error instanceof ErrorEvent) {
      //Client error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server error
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}