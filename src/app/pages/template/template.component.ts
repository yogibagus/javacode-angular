import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/service/auth.service";
import { Router } from '@angular/router';
import { Auth, User } from "src/app/models/auth.model";
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  user?: User; // get model first
  nama?: string;
  email?: string;
  token?: string;
  constructor(private authService: AuthService, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser')); // store data on this.user using model
    this.nama = this.user?.nama; // get from the model
    this.email = this.user?.email;
    this.token = this.user?.token;
  }

  ngOnInit(): void {

  }

  goHakAkses() {
    this.router.navigateByUrl('/hak-akses');
  }

  goUser() {
    this.router.navigateByUrl('/user');
  }

  goSettingMenu() {
    this.router.navigateByUrl('/user');
  }

  goSettingCustomer() {
    this.router.navigateByUrl('/customer');
  }

  goSettingPromo() {
    this.router.navigateByUrl('/promo');
  }

  goSettingDiskon() {
    this.router.navigateByUrl('/diskon');
  }

  goSettingVoucher() {
    this.router.navigateByUrl('/voucher');
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


  logout() {
    this.authService.logout()
  }
}
