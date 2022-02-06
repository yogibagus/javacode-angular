import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HakAksesComponent } from './pages/auth/hak-akses/hak-akses.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserComponent } from './pages/auth/user/user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CustomerComponent } from './pages/settings/customer/customer.component';
import { DiskonComponent } from './pages/settings/diskon/diskon.component';
import { MenuComponent } from './pages/settings/menu/menu.component';
import { PromoComponent } from './pages/settings/promo/promo.component';
import { VoucherComponent } from './pages/settings/voucher/voucher.component';
import { TemplateComponent } from './pages/template/template.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: TemplateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'customer',
        component: CustomerComponent
      },
      {
        path: 'promo',
        component: PromoComponent
      },
      {
        path: 'diskon',
        component: DiskonComponent
      },
      {
        path: 'voucher',
        component: VoucherComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'hak-akses',
        component: HakAksesComponent
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
