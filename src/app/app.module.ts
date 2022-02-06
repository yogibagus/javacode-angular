import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { TemplateComponent } from './pages/template/template.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './pages/settings/menu/menu.component';
import { CustomerComponent } from './pages/settings/customer/customer.component';
import { PromoComponent } from './pages/settings/promo/promo.component';
import { DiskonComponent } from './pages/settings/diskon/diskon.component';
import { VoucherComponent } from './pages/settings/voucher/voucher.component';
import { UserComponent } from './pages/auth/user/user.component';
import { HakAksesComponent } from './pages/auth/hak-akses/hak-akses.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    DashboardComponent,
    MenuComponent,
    CustomerComponent,
    PromoComponent,
    DiskonComponent,
    VoucherComponent,
    UserComponent,
    HakAksesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
