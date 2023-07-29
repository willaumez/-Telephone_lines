
export enum Categorie {
  FIX = "FIX",
  VPNADSL = "VPNADSL",
  VPNLL = "VPNLL"
}

export enum DebitType {
  _512Ko = "_512Ko",
  _1M = "_1M"
}

export enum EtatType {
  ACTIF = "ACTIF",
  RESILIE = "RESILIE",
  CESSION = "CESSION"
}

export enum ForfaitGSM {
  _10G = "_10G",
  _20G = "_20G",
  _25G = "_25G",
  _30G = "_30G",
  _40G = "_40G",
  _50G = "_50G"
}

export enum ForfaitInternet {
  _70G = "_70G"
}

export enum NatureType {
  SIEGE = "SIEGE",
  FLOTTE_MOBILE = "FLOTTE_MOBILE",
  POINT_DE_VENTE = "POINT_DE_VENTE"
}


export interface LigneTelephoniqueDTO{
  id: number;
  type: string;
  numeroLigne: string;
  affectation: string;
  poste: string;
  etat: EtatType;
  dateLivraison: Date;
  numeroSerie: string;
  montant: number;
  adresseIp?: string;
  VPN?: boolean;
  fonction?: string;
  forfait?: ForfaitInternet | ForfaitGSM;
  codePIN?: string;
  codePUK?: string;
  categorie?: Categorie;
  debit?: DebitType;
}
