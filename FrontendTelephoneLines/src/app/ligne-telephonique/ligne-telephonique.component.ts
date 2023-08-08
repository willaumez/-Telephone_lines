import {Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import {LigneTelephoniqueService} from "../services/ligne-telephonique.service";
import {MatDialog} from "@angular/material/dialog";
import {LigneAddEditComponent} from "./ligne-add-edit/ligne-add-edit.component";
import {CoreService} from "../core/core.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ligne-telephonique',
  templateUrl: './ligne-telephonique.component.html',
  styleUrls: ['./ligne-telephonique.component.scss']
})

export class LigneTelephoniqueComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'type', 'numeroLigne', 'affectation', 'poste', 'etat', 'dateLivraison',
    'numeroSerie', 'montant', 'fonction','nomPrenom', 'nature', 'forfait', 'codePIN', 'codePUK',
    'adresseIp', 'categorie', 'debit', 'ACTIONS'];

  dataSource!: MatTableDataSource<any>;
/*  // Supposons que dataSource soit un Observable<any> dans votre composant
  dataSource!: Observable<any>;
  // Créez une variable pour contenir le tableau de données
  dataList: any[] = [];
  // Initialisez MatTableDataSource en utilisant le tableau de données
  matDataSource = new MatTableDataSource<any>(this.dataList);
  // Abonnez-vous à votre dataSource et mettez à jour le tableau de données
  this.dataSource.subscribe(data => {
  this.dataList = data;
  this.matDataSource.data = data;
});*/


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ligneService: LigneTelephoniqueService, private _dialog: MatDialog, private _coreService: CoreService) {
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

    const cleanedNumber = numeroLigne.replace(/[\s-]/g, '');

    if (cleanedNumber.length === 12) {
      return `(${cleanedNumber.substr(0, 3)}) ${cleanedNumber.substr(3, 3)} ${cleanedNumber.substr(6, 3)} ${cleanedNumber.substr(9, 3)}`;
    }

    return numeroLigne;
  }



  /*getListLignes(){
    this.lignesTel$ = this.ligneService.getLignesTelephoniques().pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }*/


//MatDialog   (Modal)
  openAddEditLignForm() {
    const dialogRef = this._dialog.open(LigneAddEditComponent, {});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListLignes();
        }
      },
    });
    //this.getListLignes();
  }


  // delete
  handleDeleteLigne(id: number) {
    let conf = confirm("Es-tu sure de supprimer cette ligne téléphonique?")
    if (!conf) return;
    this.ligneService.deleteLigneTelephonique(id).subscribe({
      next: (res) => {
        //this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getListLignes();
        this._coreService.openSnackBar("La ligne téléphonique a été supprimée avec succès! ");
      },
      error:err => {
        console.log(err);
      }
    });
  }

  //edit
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(LigneAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListLignes();
        }
      },
    });
  }




}
