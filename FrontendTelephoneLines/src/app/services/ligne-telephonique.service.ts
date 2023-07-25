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





}
