package com.telephone.backendtelephonelines.mappers;

import com.telephone.backendtelephonelines.dtos.FixVpnAdslVpnLLDTO;
import com.telephone.backendtelephonelines.dtos.GsmDTO;
import com.telephone.backendtelephonelines.dtos.InternetMobileDTO;
import com.telephone.backendtelephonelines.dtos.InternetMobileVPNDTO;
import com.telephone.backendtelephonelines.entities.FixVpnAdslVpnLL;
import com.telephone.backendtelephonelines.entities.Gsm;
import com.telephone.backendtelephonelines.entities.InternetMobile;
import com.telephone.backendtelephonelines.entities.InternetMobileVPN;

public interface LigneTelephoniqueMappers {

    InternetMobileVPNDTO fromInternetMobileVPN(InternetMobileVPN internetMobileVPN);
    InternetMobileVPN fromInternetMobileVPNDTO(InternetMobileVPNDTO internetMobileVPNDTO);


    InternetMobileDTO fromInternetMobile(InternetMobile internetMobile);
    InternetMobile fromInternetMobileDTO(InternetMobileDTO internetMobileDTO);


    GsmDTO fromGsm(Gsm gsm);
    Gsm fromGsmDTO(GsmDTO gsmDTO);


    FixVpnAdslVpnLLDTO fromFixVpnAdslVpnLL(FixVpnAdslVpnLL fixVpnAdslVpnLL);
    FixVpnAdslVpnLL fromFixVpnAdslVpnLLDTO(FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO);

}
