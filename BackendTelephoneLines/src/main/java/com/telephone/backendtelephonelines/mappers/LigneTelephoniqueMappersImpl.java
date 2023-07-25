package com.telephone.backendtelephonelines.mappers;

import com.telephone.backendtelephonelines.dtos.FixVpnAdslVpnLLDTO;
import com.telephone.backendtelephonelines.dtos.GsmDTO;
import com.telephone.backendtelephonelines.dtos.InternetMobileDTO;
import com.telephone.backendtelephonelines.dtos.InternetMobileVPNDTO;
import com.telephone.backendtelephonelines.entities.FixVpnAdslVpnLL;
import com.telephone.backendtelephonelines.entities.Gsm;
import com.telephone.backendtelephonelines.entities.InternetMobile;
import com.telephone.backendtelephonelines.entities.InternetMobileVPN;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class LigneTelephoniqueMappersImpl implements LigneTelephoniqueMappers {
    @Override
    public InternetMobileVPNDTO fromInternetMobileVPN(InternetMobileVPN internetMobileVPN) {
        InternetMobileVPNDTO internetMobileVPNDTO = new InternetMobileVPNDTO();
        BeanUtils.copyProperties(internetMobileVPN, internetMobileVPNDTO);
        internetMobileVPNDTO.setType(internetMobileVPN.getClass().getSimpleName());
        return internetMobileVPNDTO;
    }

    @Override
    public InternetMobileVPN fromInternetMobileVPNDTO(InternetMobileVPNDTO internetMobileVPNDTO) {
        InternetMobileVPN internetMobileVPN = new InternetMobileVPN();
        BeanUtils.copyProperties(internetMobileVPNDTO, internetMobileVPN);
        return internetMobileVPN;
    }

    @Override
    public InternetMobileDTO fromInternetMobile(InternetMobile internetMobile) {
        InternetMobileDTO internetMobileDTO = new InternetMobileDTO();
        BeanUtils.copyProperties(internetMobile, internetMobileDTO);
        internetMobileDTO.setType(internetMobile.getClass().getSimpleName());
        return internetMobileDTO;
    }

    @Override
    public InternetMobile fromInternetMobileDTO(InternetMobileDTO internetMobileDTO) {
        InternetMobile internetMobile = new InternetMobile();
        BeanUtils.copyProperties(internetMobileDTO, internetMobile);
        return internetMobile;
    }

    @Override
    public GsmDTO fromGsm(Gsm gsm) {
        GsmDTO gsmDTO = new GsmDTO();
        BeanUtils.copyProperties(gsm, gsmDTO);
        gsmDTO.setType(gsm.getClass().getSimpleName());
        return gsmDTO;
    }

    @Override
    public Gsm fromGsmDTO(GsmDTO gsmDTO) {
        Gsm gsm = new Gsm();
        BeanUtils.copyProperties(gsmDTO, gsm);
        return gsm;
    }

    @Override
    public FixVpnAdslVpnLLDTO fromFixVpnAdslVpnLL(FixVpnAdslVpnLL fixVpnAdslVpnLL) {
        FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO = new FixVpnAdslVpnLLDTO();
        BeanUtils.copyProperties(fixVpnAdslVpnLL, fixVpnAdslVpnLLDTO);
        fixVpnAdslVpnLLDTO.setType(fixVpnAdslVpnLL.getClass().getSimpleName());
        return fixVpnAdslVpnLLDTO;
    }

    @Override
    public FixVpnAdslVpnLL fromFixVpnAdslVpnLLDTO(FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO) {
        FixVpnAdslVpnLL fixVpnAdslVpnLL = new FixVpnAdslVpnLL();
        BeanUtils.copyProperties(fixVpnAdslVpnLLDTO, fixVpnAdslVpnLL);
        return fixVpnAdslVpnLL;
    }
}