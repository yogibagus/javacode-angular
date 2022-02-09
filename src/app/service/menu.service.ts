import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthService } from './auth.service';
import { DetailMenu, ListMenu, Menu } from '../models/menu.model';


const baseUrl = 'api/'

@Injectable({
  providedIn: 'root' // just before your class
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenuAll(): Observable<ListMenu> {
    return this.http.get<ListMenu>(`${baseUrl}menu/`);
  }

  getDetailMenu(id_menu): Observable<DetailMenu> {
    return this.http.get<DetailMenu>(`${baseUrl}menu/detail/${id_menu}`);
  }

  addMenu(data): Observable<any> {
    return this.http.post(`${baseUrl}menu/insert/`, data);
  }

  updateMenu(id_menu, data): Observable<any> {
    return this.http.post(`${baseUrl}menu/update/${id_menu}`, data);
  }
}
