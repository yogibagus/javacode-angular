import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
  constructor() {

  }

  ngOnInit(): void {
  }

}
