import {Component, OnInit, ViewChild} from '@angular/core';
import {LigneTelephoniqueService} from "../../services/ligne-telephonique.service";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LigneAddEditComponent} from "../../ligne-telephonique/ligne-add-edit/ligne-add-edit.component";

@Component({
  selector: 'app-gsm',
  templateUrl: './gsm.component.html',
  styleUrls: ['./gsm.component.scss']
})

export class GSMComponent implements OnInit{
  displayedColumns: string[] = [
    'numeroLigne', 'affectation', 'poste', 'etat', 'dateLivraison',
    'numeroSerie', 'montant', 'fonction', 'nomPrenom', 'nature', 'forfait', 'codePIN', 'codePUK', 'ACTIONS'];

  dataSource!: MatTableDataSource<any>;
  typeLigne: string = "Gsm";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private ligneService: LigneTelephoniqueService, private _dialog: MatDialog, private _coreService: CoreService) {
  }

  ngOnInit(): void {
    this.getListLignes();
  }

  getListLignes() {
    this.ligneService.getTypeLignesTelephoniques(this.typeLigne).subscribe({
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
    if (cleanedNumber.length === 10) {
      return cleanedNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
    }
    else if (cleanedNumber.length === 12) {
      return cleanedNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1-$2-$3-$4');
    }
    return numeroLigne;
  }


//MatDialog   (Modal)
  openAddEditLignForm() {
    const dialogRef = this._dialog.open(LigneAddEditComponent, {
      data: {typeLigne: {value: this.typeLigne, viewValue: "GSM"}}
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getListLignes();
        }
      },
    });
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
