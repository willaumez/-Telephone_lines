package com.telephone.backendtelephonelines.dtos;

import com.telephone.backendtelephonelines.enums.Categorie;
import com.telephone.backendtelephonelines.enums.DebitType;
import com.telephone.backendtelephonelines.enums.EtatType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
public class FixVpnAdslVpnLLDTO extends LigneTelephoniqueDTO{
    @Id
    private Long id;
    private String numeroLigne;
    private String affectation;
    private String poste;
    private EtatType etat;
    private Date dateLivraison;
    private String numeroSerie;
    private Double montant;

    private String adresseIp;
    private Categorie categorie;
    private DebitType debit;
}
