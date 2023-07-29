package com.telephone.backendtelephonelines.entities;


import com.telephone.backendtelephonelines.enums.ForfaitType;
import com.telephone.backendtelephonelines.enums.NatureType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("GSM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gsm extends LigneTelephonique{
    private String fonction;

    @Enumerated(EnumType.STRING)
    private NatureType nature;

    @Enumerated(EnumType.STRING)
    private ForfaitType forfait;

    private String nomPrenom;
    private String codePIN;
    private String codePUK;
}
