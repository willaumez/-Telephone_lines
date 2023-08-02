import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../Models/User";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {CoreService} from "../core/core.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userData: User | any;
  showPasswordEdit = false;
  showInfosEdit = false;
  passwordConfirmed = false;
  hide: boolean = true;
  userForm: FormGroup | any;

  constructor(private loginService: LoginService, private _fb: FormBuilder, private _userService: UserService, private _coreService: CoreService) {
    this.userData = this.loginService.getUserData();

    this.userForm = this._fb.group({
      id: this.userData.id,
      username: [this.userData.username, [Validators.required, Validators.minLength(4)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password2: [null, [Validators.required, Validators.minLength(6)]],
      role: [this.userData.role, [Validators.required]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
  }

  showEditInfos() {
    this.showInfosEdit = !this.showInfosEdit;
    this.userForm.patchValue({
      username: this.userData.username,
      email: this.userData.email,
      password: null,
      password2: null,
    });
  }

  showChangePassword() {
    this.showPasswordEdit = !this.showPasswordEdit;
  }

  // Fonction de validation personnalisée pour vérifier l'égalité des mots de passe
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;

    if (password !== password2) {
      control.get('password2')?.setErrors({'passwordMismatch': true});
      return {'passwordMismatch': true};
    } else {
      control.get('password2')?.setErrors(null);
      return null;
    }
  }


  onFormSubmit() {
    if (this.showInfosEdit) {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('password2')?.clearValidators();
      this.userForm.get('password2')?.updateValueAndValidity();
      if (this.userForm.valid){
        let user: User = this.userForm.value;
        // @ts-ignore
        delete user.password;
        console.log(" let user: User = this.userForm.value;---", user)
        this._userService.updateUser(user).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Informations misent à jour avec succès !');
            this.loginService.setUserData(user);
          },
          error: (err: any) => {
            this._coreService.openSnackBar('Échec de la modification des informations!');
            console.log(err);
          }
        });
      }
      else {
        this._coreService.openSnackBar('Valider correctement le formulaire avant de soumettre !');
        return;
      }
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('password2')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.userForm.get('password2')?.updateValueAndValidity();
    }
    if (this.showPasswordEdit && !this.passwordConfirmed) {
      let password: string = this.userForm.value.password;
      this._userService.confirmPassword(this.userData.id, password).subscribe({
        next: (val: any) => {
          console.log("this._userService.confirmPassword--" + val);
          if (val) {
            this._coreService.openSnackBar('Mot de passe confirmé!\n Entrer le nouveau mot de passe!');
            this.userForm.patchValue({
              password: null,
              password2: null,
            });
            this.passwordConfirmed = true;
          } else {
            this._coreService.openSnackBar('Mot de passe incorrecte!  Réessayer!');
            this.passwordConfirmed = false;
          }
        },
        error: (err: any) => {
          console.log(err);
          this._coreService.openSnackBar('Mot de passe incorrecte!  Réessayer!');
        }
      });
    }
    if (this.showPasswordEdit && this.passwordConfirmed) {
      if (this.userForm.valid) {
        let user: User = this.userForm.value;
        this._userService.saveUser(user).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Mot de pass modifié avec succès !');
            this.passwordConfirmed = false;
            this.showPasswordEdit = false;
          },
          error: (err: any) => {
            console.log(err);
            //this._coreService.openSnackBar('Le Nom et l\'E-mail doivent être uniques !');
          }
        });
      } else {
        this._coreService.openSnackBar('Valider correctement le formulaire avant de soumettre !');
        this.userForm.patchValue({
          password: null,
          password2: null,
        });
        //this.passwordConfirmed = false;
        return;
      }
    }
    /* // Si l'action est une création d'utilisateur
     if (!this.data){
       if (this.userForm.valid){
         let user: User = this.userForm.value;
         this._userService.saveUser(user).subscribe({
           next: (val: any) => {
             this._coreService.openSnackBar('Utilisateur ajouté avec succès !');
             this._dialogRef.close(true);
           },
           error: (err: any) => {
             console.log(err);
             this._coreService.openSnackBar('Le Nom et l\'E-mail doivent être uniques !');
           }
         });
       }else {
         this._coreService.openSnackBar('Valider correctement le formulaire avant de soumettre !');
         return;
       }
     }else {
       if (this.showPasswordFields && this.userForm.valid){
         let user: User = this.userForm.value;
         this._userService.updateUser(user).subscribe({
           next: (val: any) => {
             this._dialogRef.close(true);
             this._coreService.openSnackBar('Utilisateur mise à jour avec succès !');
           },
           error: (err: any) => {
             this._coreService.openSnackBar('Le Nom et l\'E-mail doivent être uniques !');
             console.log(err);
           }
         });
       } else if (!this.showPasswordFields){
         // Supprimer temporairement les validateurs des champs de mot de passe lors de la mise à jour
         this.userForm.get('password')?.clearValidators();
         this.userForm.get('password')?.updateValueAndValidity();
         this.userForm.get('password2')?.clearValidators();
         this.userForm.get('password2')?.updateValueAndValidity();

         if (this.userForm.valid){
           let user: User = this.userForm.value;
           this._userService.updateUser(user).subscribe({
             next: (val: any) => {
               this._dialogRef.close(true);
               this._coreService.openSnackBar('Utilisateur mise à jour avec succès !');
             },
             error: (err: any) => {
               this._coreService.openSnackBar('Le Nom et l\'E-mail doivent être uniques !');
               console.log(err);
             }
           });
         }
         else {
           this._coreService.openSnackBar('Valider correctement le formulaire avant de soumettre !');
           return;
         }
         // Ajouter à nouveau les validateurs après la mise à jour
         this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
         this.userForm.get('password')?.updateValueAndValidity();
         this.userForm.get('password2')?.setValidators([Validators.required, Validators.minLength(6)]);
         this.userForm.get('password2')?.updateValueAndValidity();
       }
       else {
         this._coreService.openSnackBar('Valider correctement le formulaire avant de soumettre !');
         return;
       }
     }
  */
  }


}
