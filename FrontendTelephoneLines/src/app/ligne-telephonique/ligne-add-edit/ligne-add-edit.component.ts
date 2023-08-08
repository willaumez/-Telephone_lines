import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  typeList!: any;

  constructor(
    private _fb: FormBuilder,
    private _ligneService: LigneTelephoniqueService,
    private _dialogRef: MatDialogRef<LigneAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.lignForm = this._fb.group({
      type: this.defaultType,
      numeroLigne: ['', [Validators.required, Validators.pattern('[657]-[0-9]{3}-[0-9]{3}-[0-9]{3}')]],
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
      id: '',
    });
  }

  startDate() {
    //return (new Date(2023, 0, 1));
    return new Date(Date.now());
  }

  ngOnInit(): void {
    if (this.data && 'typeLigne' in this.data) {
      this.lignForm.patchValue({
        type: this.data.typeLigne.value,
      });
    } else {
      this.lignForm.patchValue(this.data);
    }
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
      console.log("numIni--  ", lignTel)
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

  //format
  /*limitNumeroLigneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^\d]/g, '');  // Enleve tout sauf les chiffres


    if (value.length > 9) {
      input.value = value.slice(0, 9);
    } else {
      input.value = value;
    }

    // Format with spaces
    if (input.value.length >= 1) {
      const formattedValue = input.value.replace(/([67])(\d{0,3})(\d{0,3})(\d{0,3})/, '$1 $2 $3 $4');
      input.value = formattedValue.trim();
    }

    this.lignForm.patchValue({numeroLigne: input.value.replace(/\s/g, '')});

    if (input.value.length === 9 && (input.value.startsWith('6') || input.value.startsWith('7'))) {
      this.lignForm.get('numeroLigne')?.setErrors(null);
    } else {
      this.lignForm.get('numeroLigne')?.setErrors({pattern: true});
    }
  }*/


  limitNumeroLigneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d]/g, '');  // Remove all non-digits

    // Apply conditions based on getType()
    const type = this.getType(); // Replace this with your actual getType() function
    if (type === 'Gsm' || type === 'InternetMobile') {
      value = value.replace(/^[^67]/, ''); // Remove anything that doesn't start with 6 or 7
    } else if (type === 'InternetMobileVPN') {
      value = value.replace(/^[^5]/, ''); // Remove anything that doesn't start with 5
    } else if (type === 'FixVpnAdslVpnLL') {
      value = value.replace(/^[^5]/, ''); // Remove anything that doesn't start with 5
    }

    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    // Format with spaces
    if (value.length >= 1) {
      const formattedValue = value.replace(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,3})/, '$1 $2 $3 $4');
      input.value = formattedValue.trim();
    } else {
      input.value = value;
    }

    this.lignForm.patchValue({ numeroLigne: value.replace(/\s/g, '') });

    // Validate based on conditions
    if (
      (value.length === 9 && (type === 'Gsm' || type === 'InternetMobile') && (value.startsWith('6') || value.startsWith('7'))) ||
      (type === 'InternetMobileVPN' && value.startsWith('5')) ||
      (type === 'FixVpnAdslVpnLL' && value.startsWith('5'))
    ) {
      this.lignForm.get('numeroLigne')?.setErrors(null);
    } else {
      this.lignForm.get('numeroLigne')?.setErrors({ pattern: true });
    }
  }




}



