import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {LigneTelephoniqueDTO} from "../Models/LigneTelephoniqueDTO";

@Injectable({
  providedIn: 'root'
})
export class LigneTelephoniqueService {

  constructor(private http: HttpClient) {

  }

  public getLignesTelephoniques(){
    return this.http.get<Array<LigneTelephoniqueDTO>>(environment.backEndHost+"/lignes");
  }
  /*public getLignesTelephoniques(): Observable<Array<LigneTelephoniqueDTO>>{
    return this.http.get<Array<LigneTelephoniqueDTO>>(environment.backEndHost+"/lignes");
  }*/

  public getLigneTelephoniqueById(id: number): Observable<LigneTelephoniqueDTO>{
    return this.http.get<LigneTelephoniqueDTO>(environment.backEndHost+"/lignes/"+id);
  }

  //  save
  public saveLigneTelephonique(data: LigneTelephoniqueDTO): Observable<LigneTelephoniqueDTO> {
    if (data.type === 'FixVpnAdslVpnLL') {
      return this.http.post<LigneTelephoniqueDTO>(environment.backEndHost + "/ligne/saveFix", data);
    } else if (data.type === 'Gsm') {
      return this.http.post<LigneTelephoniqueDTO>(environment.backEndHost + "/ligne/saveGsm", data);
    } else if (data.type === 'InternetMobile') {
      return this.http.post<LigneTelephoniqueDTO>(environment.backEndHost + "/ligne/saveInternetMobile", data);
    } else if (data.type === 'InternetMobileVPN') {
      return this.http.post<LigneTelephoniqueDTO>(environment.backEndHost + "/ligne/saveInternetMobileVPN", data);
    } else {
      throw new Error('Type de ligne téléphonique invalide');
    }
  }
  //update
  public updateLigneTelephonique(ligneTelephonique: LigneTelephoniqueDTO): Observable<LigneTelephoniqueDTO> {
    if (ligneTelephonique.type === 'FixVpnAdslVpnLL') {
      return this.http.put<LigneTelephoniqueDTO>(environment.backEndHost + "/updateFix", ligneTelephonique);
    } else if (ligneTelephonique.type === 'Gsm') {
      return this.http.put<LigneTelephoniqueDTO>(environment.backEndHost + "/updateGsm", ligneTelephonique);
    } else if (ligneTelephonique.type === 'InternetMobile') {
      return this.http.put<LigneTelephoniqueDTO>(environment.backEndHost + "/updateInternetMobile", ligneTelephonique);
    } else if (ligneTelephonique.type === 'InternetMobileVPN') {
      return this.http.put<LigneTelephoniqueDTO>(environment.backEndHost + "/updateInternetMobileVPN", ligneTelephonique);
    } else {
      throw new Error('Type de ligne téléphonique invalide');
    }
  }

  //delete
  public deleteLigneTelephonique(id: number){
    return this.http.delete(environment.backEndHost + "/ligne/deleteLigne/"+id);
  }

  //get Type
  getTypeLignesTelephoniques(type: string) {
    return this.http.get<Array<LigneTelephoniqueDTO>>(environment.backEndHost+"/lignes/type/"+type);
  }


}
