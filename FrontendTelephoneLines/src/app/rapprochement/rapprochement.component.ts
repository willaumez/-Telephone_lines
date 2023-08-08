import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rapprochement',
  templateUrl: './rapprochement.component.html',
  styleUrls: ['./rapprochement.component.scss']
})
export class RapprochementComponent implements OnInit {
  file: any;
  arrayBuffer: any;
  worksheet: any;
  dataFromExcel: any[] = [];
  ngOnInit(): void {
  }

  constructor() {
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }
  isFileDragging: boolean = false;

  onFileDragOver(event: DragEvent): void {
    this.isFileDragging = true;
    event.preventDefault();
  }

  onFileDragLeave(event: DragEvent): void {
    this.isFileDragging = false;
    event.preventDefault();
  }

  onFileDrop(event: DragEvent): void {
    this.isFileDragging = false;
    event.preventDefault();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.readFile(this.selectedFile);
    }
  }

  selectedFile: File | undefined;

  getFile(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.readFile(this.selectedFile);
    } else {
      console.error("No file selected.");
    }
  }

  private readFile(file: File): void {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      const data = new Uint8Array(this.arrayBuffer);
      const arr = new Array();

      for (let i = 0; i !== data.length; i++) {
        arr[i] = String.fromCharCode(data[i]);
      }

      const bstr = arr.join('');
      const workbook = XLSX.read(bstr, { type: 'binary', cellDates: true });
      const first_sheet_name = workbook.SheetNames[0];

      const worksheet = workbook.Sheets[first_sheet_name];
      this.worksheet = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      // Appeler votre méthode pour correspondre aux cellules ici
      // this.matchingCell(this.worksheet, line);
    };

    fileReader.readAsArrayBuffer(file);
  }

  onFormSubmit(): void {
    // Gérer la soumission du formulaire, y compris le fichier sélectionné
  }
}
