import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import {catchError, Observable, throwError} from "rxjs";
import {LigneTelephoniqueDTO} from "../Models/LigneTelephoniqueDTO";
import {LigneTelephoniqueService} from "../services/ligne-telephonique.service";

@Component({
  selector: 'app-ligne-telephonique',
  templateUrl: './ligne-telephonique.component.html',
  styleUrls: ['./ligne-telephonique.component.scss']
})
export class LigneTelephoniqueComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'type', 'numeroLigne', 'affectation', 'poste', 'etat', 'dateLivraison',
    'numeroSerie', 'montant', 'VPN', 'fonction', 'forfait', 'codePIN', 'codePUK',
    'Ip', 'categorie', 'debit'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  lignesTel$!: Observable<Array<LigneTelephoniqueDTO>>;


  constructor(private ligneService: LigneTelephoniqueService) {
  }

  ngOnInit(): void {
    this.getListLignes();
  }

  getListLignes() {
    this.ligneService.getLignesTelephoniques().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*getListLignes(){
    this.lignesTel$ = this.ligneService.getLignesTelephoniques().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }*/


}
