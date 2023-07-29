package com.telephone.backendtelephonelines.entities;

import com.telephone.backendtelephonelines.enums.EtatType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE",length = 4)
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class LigneTelephonique {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String numeroLigne;
    private String affectation;
    private String poste;
    @Enumerated(EnumType.STRING)
    private EtatType etat;
    private Date dateLivraison;
    @Column(unique = true)
    private String numeroSerie;
    private Double montant;
}
