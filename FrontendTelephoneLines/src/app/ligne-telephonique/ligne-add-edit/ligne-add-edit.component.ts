import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LigneTelephoniqueService} from "../../services/ligne-telephonique.service";
import {LigneTelephoniqueDTO} from "../../Models/LigneTelephoniqueDTO";
import {Router} from "@angular/router";
import {CoreService} from "../../core/core.service";

interface Selection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-ligne-add-edit',
  templateUrl: './ligne-add-edit.component.html',
  styleUrls: ['./ligne-add-edit.component.scss']
})


export class LigneAddEditComponent implements OnInit {
  lignForm: FormGroup;

  types: Selection[] = [
    {value: 'Gsm', viewValue: 'GSM'},
    {value: 'InternetMobile', viewValue: 'Internet-Mobile'},
    {value: 'InternetMobileVPN', viewValue: 'Internet-Mobile-VPN'},
    {value: 'FixVpnAdslVpnLL', viewValue: 'Fix / Vpn-Adsl / Vpn-LL'},
  ]
  etats: Selection[] = [
    {value: 'ACTIF', viewValue: 'Actif'},
    {value: 'RESILIE', viewValue: 'Resilié'},
    {value: 'CESSION', viewValue: 'Cession'},
  ]
  forfaitGsm: Selection[] = [
    {value: '_10G', viewValue: '_10G'}, {value: '_20G', viewValue: '_20G'},
    {value: '_25G', viewValue: '_25G'}, {value: '_30G', viewValue: '_30G'},
    {value: '_40G', viewValue: '_40G'}, {value: '_50G', viewValue: '_50G'},
  ]
  forfaitInternet: Selection[] = [
    {value: '_70G', viewValue: '_70G'}, {value: '_100G', viewValue: '_100G'},
  ]
  categories: Selection[] = [
    {value: 'FIX', viewValue: 'FIX'}, {value: 'VPNADSL', viewValue: 'VPN-ADSL'},
    {value: 'VPNLL', viewValue: 'VPN-LL'},
  ]
  debits: Selection[] = [
    {value: '_512Ko', viewValue: '_512Ko'}, {value: '_1M', viewValue: '_1M'},
  ]
  natures: Selection[] = [
    {value: 'SIEGE', viewValue: 'SIEGE'}, {value: 'FLOTTE_MOBILE', viewValue: 'FLOTTE_MOBILE'},
    {value: 'POINT_DE_VENTE', viewValue: 'POINT_DE_VENTE'},
  ]
  defaultType = this.types[0].value;

  constructor(
    private _fb: FormBuilder,
    private _ligneService: LigneTelephoniqueService,
    private _dialogRef: MatDialogRef<LigneAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.lignForm = this._fb.group({
      type: this.defaultType,
      numeroLigne: '',
      affectation: '',
      poste: '',
      etat: '',
      dateLivraison: '',
      numeroSerie: '',
      montant: 0.0,
      fonction: '',
      forfait: '',
      nature: '',
      nomPrenom: '',
      codePIN: '',
      codePUK: '',
      categorie: '',
      debit: '',
      adresseIp: '',
      id:'',
    });
  }

  startDate() {
    //return (new Date(2023, 0, 1));
    return new Date(Date.now());
  }

  ngOnInit(): void {
    this.lignForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.data) {
      let lignTel: LigneTelephoniqueDTO = this.lignForm?.value;
      this._ligneService.updateLigneTelephonique(lignTel).subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
          this._coreService.openSnackBar('Ligne téléphonique mise à jour avec succès !')
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    } else {
      let lignTel: LigneTelephoniqueDTO = this.lignForm?.value;
      this._ligneService.saveLigneTelephonique(lignTel).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Ligne téléphonique ajoutée avec succès')
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }


  getType(): string {
    return this.lignForm.value.type;
  }

}



