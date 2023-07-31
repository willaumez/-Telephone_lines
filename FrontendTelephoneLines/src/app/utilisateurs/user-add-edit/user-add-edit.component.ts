import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";
import {User} from "../../Models/User";
import {UserService} from "../../services/user.service";

interface Selection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit{

  userForm: FormGroup;
  roles: Selection[] = [
    {value: 'ADMIN', viewValue: 'ADMIN'},
    {value: 'USER', viewValue: 'USER'},
  ]

  constructor(private _fb: FormBuilder, private _userService: UserService,
              private _dialogRef: MatDialogRef<UserAddEditComponent>, private _coreService: CoreService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.userForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['',[Validators.required, Validators.email]],
      password: [this.data ? null : '', [Validators.required, Validators.minLength(6)]],
      role: ['',[Validators.required]],
    });
  }
  ngOnInit(): void {
    if (this.data){
      console.log("oif (this.data)--", this.data);
      this.userForm.patchValue(this.data);
     /* // Supprimer la propriété "password" de this.data avant de le patcher dans le formulaire
      const dataWithoutPassword = { ...this.data };
      delete dataWithoutPassword.password;

      console.log("dataWithoutPassword", dataWithoutPassword);
      this.userForm.patchValue(dataWithoutPassword);

      //this.userForm.patchValue(this.data);*/
    }
  }

  onFormSubmit() {
    if (this.data) {
      let user: User = this.userForm?.value;
      console.log(" let user: User = --", user);
      this._userService.updateUser(user).subscribe({
        next: (val: any) => {
          this._dialogRef.close(true);
          this._coreService.openSnackBar('Utilisateur mise à jour avec succès !')
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    } else {
      let user: User = this.userForm?.value;
      this._userService.saveUser(user).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Utilisateur ajoutée avec succès ! ')
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  getName(): string {
    return this.userForm.value.username;
  }
}
