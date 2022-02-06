import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Akses, ListRoles, Role, Users } from 'src/app/models/users.model';
import { User } from 'src/app/models/auth.model';
import { Observable } from 'rxjs/internal/Observable';

import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthService } from './auth.service';


const baseUrl = 'api/'

@Injectable({
  providedIn: 'root' // just before your class
})
export class UserService {

  constructor(private http: HttpClient,
    private authService: AuthService,) { }


  getAll() {
    return this.http.get<Users>(`${baseUrl}users/`);
  }


  getUserByID(id_user: any): Observable<Users> {
    return this.http.get<Users>(`${baseUrl}users/${id_user}`).pipe(catchError(this.authService.handleError), map(user => {
      return user;
    }));
  }


  getRoles() {
    return this.http.get<ListRoles>(`${baseUrl}roles/`)
      .pipe(catchError(this.authService.handleError), map(roles => {
        if (roles.status_code == 200) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
        }
        return roles;
      }));
  }



  getRolesByID(id_roles: any): Observable<Akses> {
    return this.http.get<Akses>(`${baseUrl}roles/${id_roles}`).pipe(catchError(this.authService.handleError), map(roles => {
      return roles;
    }));
  }

  updateUserByID(id: any, data: User) {
    return this.http.post(`${baseUrl}users/update/` + id, data)
  }

  delete(id: any) {
    return this.http.delete(`${baseUrl}users/delete/` + id);
  }

}