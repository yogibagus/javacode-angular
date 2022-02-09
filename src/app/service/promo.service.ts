import { Injectable } from '@angular/core';
import { detailPromo, listPromo, promo } from "src/app/models/promo.model";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

const baseUrl = "api/";

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private http: HttpClient) { }

  getPromoAll(): Observable<listPromo> {
    return this.http.get<listPromo>(`${baseUrl}promo/`);
  }

  addPromo(data): Observable<any> {
    return this.http.post(`${baseUrl}promo/insert/`, data);
  }

  getPromoByID(id_promo): Observable<detailPromo> {
    return this.http.get<detailPromo>(`${baseUrl}promo/${id_promo}`);
  }

  updatePromo(id_promo, data): Observable<any> {
    return this.http.post(`${baseUrl}promo/update/${id_promo}`, data);
  }

}
