import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {CoreService} from "../core/core.service";
import {LigneAddEditComponent} from "../ligne-telephonique/ligne-add-edit/ligne-add-edit.component";
import {UserAddEditComponent} from "./user-add-edit/user-add-edit.component";

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit{

  displayedColumns: string[] = [
    'id', 'username', 'email', 'password', 'role', 'ACTIONS'];

  @Input()
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private _dialog: MatDialog, private _coreService: CoreService) { }

  ngOnInit(): void {
    this.getUtilisateurs();
  }

  getUtilisateurs(): void {
    this.userService.listUsers().subscribe(
      (data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        console.log(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditLignForm() {
    const dialogRef = this._dialog.open(UserAddEditComponent, {});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUtilisateurs();
        }
      },
    });
    //this.getListLignes();
  }


  // delete
  handleDeleteLigne(id: number) {
    /*let conf = confirm("Es-tu sure de supprimer cette ligne téléphonique?")
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
    });*/
  }

  //edit
  openEditForm(data: any) {
    console.log("openEditForm(data: any)--", data);
    const dialogRef = this._dialog.open(UserAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUtilisateurs();
        }
      },
    });
  }

}
