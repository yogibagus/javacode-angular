import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, User } from "src/app/models/auth.model";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ListRoles, Role, UserData, Users } from 'src/app/models/users.model';
import { UserService } from "src/app/service/users.service";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentUser: User;
  getUser: Users;
  userForm: FormGroup;

  listRoles?: Role[];
  currentRolesID: number;
  selectedRoles;

  nama?: string = "";
  email?: string = "";
  id_user?: number;
  hak_akses: string;


  constructor(private userService: UserService, private router: Router, private formbuilder: FormBuilder, private authService: AuthService) {

  }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); // store data on this.user using model
    this.id_user = this.currentUser.id_user; // get from the model

    // get roles
    this.userService.getRoles().subscribe({
      next: (data) => {
        this.listRoles = data.data;
      }
    });


    //get user 
    this.userService.getUserByID(this.id_user)
      .subscribe({
        next: (data) => {
          if (data.status_code == 200) {
            this.getUser = data;

            this.currentRolesID = data.data.m_roles_id;

            // set default value form
            this.userForm.controls['email'].setValue(data.data.email);
            this.userForm.controls['nama'].setValue(data.data.nama);
            this.userForm.controls['hakAkses'].setValue(this.currentRolesID);
          } else {
            this.alertToast('error', 'Error saat mendapatkan data');
            this.authService.logout();
          }

        },
        error: error => {
          // this.errorMessage = error.message;
          this.alertToast('error', error)
          console.error('There was an error!', error);
        }
      });


    // form group
    this.userForm = this.formbuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      nama: new FormControl('', [Validators.required]),
      hakAkses: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      //  hak_akses: new FormControl('', [Validators.required]),
    });

    this.selectedRoles = this.currentRolesID;

  }


  selected() {
    console.log(this.selectedRoles)
  }

  onSubmit() {
    const body = {
      email: this.userForm.value.email,
      nama: this.userForm.value.nama,
      hak_akses: this.userForm.value.hakAkses,
    }

    this.userService.updateUserByID(this.id_user, body).subscribe({
      next: (data) => {
        console.log(data);
        this.alertToast('success', 'Berhasil memperbarui user profile')
      },
      error: error => {
        // this.errorMessage = error.message;
        this.alertToast('error', error)
        console.error('There was an error!', error);
      }

    });
    console.log(body)
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

}
