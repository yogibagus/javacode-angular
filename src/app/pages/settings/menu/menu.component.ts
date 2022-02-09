import { Component, OnInit } from '@angular/core';
import { ListMenu, Menu, topping } from 'src/app/models/menu.model';
import { MenuService } from "src/app/service/menu.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menuForm: FormGroup
  listMenu: Menu[]
  detailMenu: Menu;
  listTopping: topping[];
  kategori: string = '';

  id_menu: number;
  isEdit: boolean = false;
  isAdd: boolean = false;

  constructor(private menuService: MenuService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.formAddMenu();
    this.getMenu();
  }


  formAddMenu() {
    this.menuForm = this.formBuilder.group({
      nama: new FormControl('', [Validators.required, Validators.email]),
      kategori: new FormControl('', [Validators.required]),
      harga: new FormControl('', [Validators.required]),
      deskripsi: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      //  hak_akses: new FormControl('', [Validators.required]),
    });
  }


  getMenu() {
    // get menu
    this.menuService.getMenuAll().subscribe({
      next: (data) => {
        this.listMenu = data.data;
      }
    });
  }

  onSubmit() {
    const body = {
      nama: this.menuForm.value.nama,
      kategori: this.menuForm.value.kategori,
      harga: this.menuForm.value.harga,
      deskripsi: this.menuForm.value.deskripsi,
      status: this.menuForm.value.status,
    }

    this.menuService.addMenu(body).subscribe({
      next: (data) => {
        console.log(data.status_code);
        if (data.status_code == 200) {
          // reload table
          this.getMenu();
          // reset form menu
          this.formAddMenu();
          this.alertToast('success', 'Data berhasil ditambahkan')
        } else {
          this.alertToast('error', 'Gagal menambahkan data')
        }
      },
      error: error => {
        // this.errorMessage = error.message;
        this.alertToast('error', error)
        console.error('There was an error!', error);
      }

    });
  }

  onUpdate() {
    const body = {
      nama: this.menuForm.value.nama,
      kategori: this.menuForm.value.kategori,
      harga: this.menuForm.value.harga,
      deskripsi: this.menuForm.value.deskripsi,
      status: this.menuForm.value.status,
    }
    this.menuService.updateMenu(this.id_menu, body).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.alertToast('success', 'Menu berhasil dirubah')
        } else {
          this.edit(this.id_menu);
          this.alertToast('error', data.errors)
        }
        console.log(data);
      },
      error: error => {
        this.alertToast('error', error)
        console.error('There was an error!', error);
      }
    })
    console.log(body);
  }

  selected(e: any) {
    console.log(e.target.value);
    this.kategori = e.target.value;
  }

  edit(id_menu) {
    this.isAdd = true;
    this.isEdit = true;
    this.id_menu = id_menu;
    this.menuService.getDetailMenu(id_menu).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.scrollToTop()
          this.detailMenu = data.data.menu;
          this.menuForm.controls['nama'].setValue(data.data.menu.nama);
          this.menuForm.controls['harga'].setValue(data.data.menu.harga);
          this.menuForm.controls['deskripsi'].setValue(data.data.menu.deskripsi);
          this.menuForm.controls['kategori'].setValue(data.data.menu.kategori);
          this.menuForm.controls['status'].setValue(data.data.menu.status);

          this.listTopping = data.data.topping;
        } else {
          this.alertToast('error', 'Gagal saat mengambil data')
        }
      },
      error: (error) => {
        this.alertToast('error', error)
        console.error('There was an error!', error);
      }
    });

    console.log(this.listTopping);
  }

  onResetForm() {
    this.isEdit = false;
    this.formAddMenu();
  }

  onAddMenu() {
    this.isAdd = true;
  }

  onClose() {
    this.isAdd = false;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
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
