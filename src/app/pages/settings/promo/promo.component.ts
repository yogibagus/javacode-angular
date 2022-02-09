import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PromoService } from "src/app/service/promo.service";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { promo } from 'src/app/models/promo.model';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {
  public Editor = ClassicEditor;
  public config = {
    toolbar: ['heading', '|',
      'fontfamily', 'fontsize',
      'alignment',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'custombutton', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', '|',
      'code', 'codeBlock', '|',
      'insertTable', '|', 'blockQuote', '|',
      'undo', 'redo', '|',
      'youtube',
      'mediaEmbed'
    ]
  }

  promo: promo[];
  promoForm: FormGroup;

  id_promo: number;
  isEdit: boolean = false;
  isAdd: boolean = false;
  isDiskon: boolean = true;

  constructor(private promoService: PromoService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getPromoAll()
    this.formAddPromo()
  }


  formAddPromo() {
    this.promoForm = this.formBuilder.group({
      nama: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      nominal: new FormControl('', [Validators.required]),
      kadaluarsa: new FormControl('', [Validators.required]),
      syarat_ketentuan: new FormControl('', [Validators.required]),
    });
  }

  selected(e: any) {
    console.log(e.target.value);
    if (e.target.value == "diskon") {
      this.isDiskon = true;
    } else {
      this.isDiskon = false;
    }
  }

  getPromoAll() {
    this.promoService.getPromoAll().subscribe({
      next: (data) => {
        console.log(data)
        if (data.status_code == 200) {
          this.promo = data.data;
        } else {
          this.alertToast('error', 'Terjadi kesalahan saat mengambil data')
        }
      },
      error: (error) => {
        console.log(error);
        this.alertToast('error', 'Terjadi kesalahan pada server')
      }
    })
  }

  onSubmit() {
    const body = {
      nama: this.promoForm.value.nama,
      type: this.promoForm.value.type,
      nominal: this.promoForm.value.nominal,
      kadaluarsa: this.promoForm.value.kadaluarsa,
      syarat_ketentuan: this.promoForm.value.syarat_ketentuan,
    }

    // this.promoService.addPromo(body).subscribe({
    //   next: (data) => {
    //     console.log(data.status_code);
    //     if (data.status_code == 200) {
    //       // reload table
    //       this.getPromoAll();
    //       // reset form menu
    //       this.formAddPromo();
    //       this.alertToast('success', 'Data berhasil ditambahkan')
    //     } else {
    //       this.alertToast('error', 'Gagal menambahkan data')
    //     }
    //   },
    //   error: error => {
    //     // this.errorMessage = error.message;
    //     this.alertToast('error', error)
    //     console.error('There was an error!', error);
    //   }

    // });
    console.log(body);
  }


  onUpdate() {
    const body = {
      nama: this.promoForm.value.nama,
      type: this.promoForm.value.type,
      nominal: this.promoForm.value.nominal,
      kadaluarsa: this.promoForm.value.kadaluarsa,
      syarat_ketentuan: this.promoForm.value.syarat_ketentuan,
    }
    //   this.promoService.updatePromo(this.id_promo, body).subscribe({
    //     next: (data) => {
    //       if (data.status_code == 200) {
    //         this.alertToast('success', 'Menu berhasil dirubah')
    //       } else {
    //         this.edit(this.id_promo);
    //         this.alertToast('error', data.errors)
    //       }
    //       console.log(data);
    //     },
    //     error: error => {
    //       this.alertToast('error', error)
    //       console.error('There was an error!', error);
    //     }
    //   })
    console.log(body);
  }

  edit(id_promo) {
    this.isAdd = true;
    this.isEdit = true;
    this.id_promo = id_promo;
    this.promoService.getPromoByID(id_promo).subscribe({
      next: (data) => {
        if (data.status_code == 200) {
          this.scrollToTop()
          this.promoForm.controls['nama'].setValue(data.data.nama);
          this.promoForm.controls['type'].setValue(data.data.type);
          this.promoForm.controls['nominal'].setValue(data.data.nominal);
          this.promoForm.controls['kadaluarsa'].setValue(data.data.kadaluarsa);
          this.promoForm.controls['syarat_ketentuan'].setValue(data.data.syarat_ketentuan);
        } else {
          this.alertToast('error', 'Gagal saat mengambil data')
        }
      },
      error: (error) => {
        this.alertToast('error', error)
        console.error('There was an error!', error);
      }
    });
  }



  onAddPromo() {
    this.isAdd = true;
  }

  onResetForm() {
    this.isEdit = false;
    this.formAddPromo();
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
