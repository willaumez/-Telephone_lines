package com.telephone.backendtelephonelines.dtos;

import com.telephone.backendtelephonelines.enums.EtatType;
import com.telephone.backendtelephonelines.enums.ForfaitInternet;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
public class InternetMobileDTO extends LigneTelephoniqueDTO{
    @Id
    private Long id;
    private String numeroLigne;
    private String affectation;
    private String poste;
    private EtatType etat;
    private Date dateLivraison;
    private String numeroSerie;
    private String montant;

    private String fonction;
    private ForfaitInternet forfait;
    private String codePIN;
    private String codePUK;
}
