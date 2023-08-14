import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {RapprochementService} from "../services/rapprochement.service";
import {Rapprochement} from "../Models/Rapprochement";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LigneTelephoniqueService} from "../services/ligne-telephonique.service";


@Component({
  selector: 'app-rapprochement',
  templateUrl: './rapprochement.component.html',
  styleUrls: ['./rapprochement.component.scss']
})
export class RapprochementComponent implements OnInit {
  dataFromExcel: Rapprochement[] = [];
  isLoading: boolean = false;
  isFileDragging: boolean = false;
  selectedFile!: File | null;

  //Table
  displayedColumns: string[] = ['numero', 'montant'];
  dataSource!: MatTableDataSource<any>;
  dataBase!: MatTableDataSource<any>;
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.dataFromExcel);
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getListLignes();
  }

  constructor(private rapService: RapprochementService, private cdRef: ChangeDetectorRef,private ligneService: LigneTelephoniqueService) {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    //this.dataSource = new MatTableDataSource(users);
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }
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
      //this.dataFromExcel = this.rapService.importDataFromExcel(this.selectedFile);
    }
  }
  getFile(event: any): void {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      //this.dataFromExcel = this.rapService.importDataFromExcel(this.selectedFile);
    } else {
      console.error("No file selected.");
    }
  }

  getListLignes() {
    this.ligneService.getLignesRapprochement().subscribe({
      next: (data) => {
        this.dataBase = new MatTableDataSource(data);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onFormSubmit(): void {
    if (this.selectedFile) {
      this.rapService.importDataFromExcel(this.selectedFile).subscribe(
        (data) => {
          this.dataFromExcel = data;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          //this.dataSource.paginator = this.paginator;

          // Trigger manual change detection
          this.cdRef.detectChanges();

          console.log('Contenu de dataFromExcel :', data);
        },
        (error) => {
          console.error('Erreur lors de l\'importation du fichier :', error);
        }
      );
    }
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  resetPage() {
    this.dataFromExcel= [];
    this.isLoading= false;
    this.isFileDragging= false;
    this.selectedFile= null;
  }

}
