import {Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {Observable} from "rxjs";
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
    'numeroSerie', 'montant', 'fonction', 'forfait', 'codePIN', 'codePUK',
    'Ip', 'categorie', 'debit', 'ACTIONS'];

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

  formatNumeroLigne(numeroLigne: string): string {
    if (!numeroLigne) return '---';

    // Eliminar espacios en blanco y guiones si existen
    const cleanedNumber = numeroLigne.replace(/[\s-]/g, '');

    // Si el número tiene la forma "0696647847"
    if (cleanedNumber.length === 10) {
      return cleanedNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    // Si el número tiene la forma "212696647847"
    else if (cleanedNumber.length === 12) {
      return cleanedNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4');
    }

    // Si no coincide con ninguno de los formatos esperados, devolver el número original
    return numeroLigne;
  }


  /*getListLignes(){
    this.lignesTel$ = this.ligneService.getLignesTelephoniques().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }*/


}
