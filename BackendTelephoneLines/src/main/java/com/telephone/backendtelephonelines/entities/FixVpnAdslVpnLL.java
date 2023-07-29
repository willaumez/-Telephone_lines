package com.telephone.backendtelephonelines.entities;

import com.telephone.backendtelephonelines.enums.Categorie;
import com.telephone.backendtelephonelines.enums.DebitType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("FIX")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FixVpnAdslVpnLL extends LigneTelephonique{
    @Column(unique = true)
    private String adresseIp;

    @Enumerated(EnumType.STRING)
    private Categorie categorie;

    @Enumerated(EnumType.STRING)
    private DebitType debit;
}
