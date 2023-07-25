package com.telephone.backendtelephonelines.entities;


import com.telephone.backendtelephonelines.enums.ForfaitGSM;
import com.telephone.backendtelephonelines.enums.ForfaitInternet;
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
@DiscriminatorValue("IM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InternetMobile extends LigneTelephonique{
    private String fonction;

    @Enumerated(EnumType.STRING)
    private ForfaitInternet forfait;

    private String codePIN;
    private String codePUK;
}
