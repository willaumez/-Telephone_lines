package com.telephone.backendtelephonelines.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("IMV")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InternetMobileVPN extends LigneTelephonique{
    private boolean VPN=true;
}
