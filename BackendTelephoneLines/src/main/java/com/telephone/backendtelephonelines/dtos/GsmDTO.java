package com.telephone.backendtelephonelines.dtos;

import com.telephone.backendtelephonelines.enums.EtatType;
import com.telephone.backendtelephonelines.enums.ForfaitGSM;
import com.telephone.backendtelephonelines.enums.NatureType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
public class GsmDTO extends LigneTelephoniqueDTO{
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
    private NatureType nature;
    private ForfaitGSM forfait;
    private String nomPrenom;
    private String codePIN;
    private String codePUK;
}
