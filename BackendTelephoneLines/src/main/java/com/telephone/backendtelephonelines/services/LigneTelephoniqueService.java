package com.telephone.backendtelephonelines.services;

import com.telephone.backendtelephonelines.dtos.*;
import com.telephone.backendtelephonelines.entities.User;
import com.telephone.backendtelephonelines.exceptions.LigneTelephoniqueNotFoundException;
import com.telephone.backendtelephonelines.exceptions.UserNotFoundException;

import java.util.List;

public interface LigneTelephoniqueService {

    User saveUser(User user);
    User getUser(Long userId) throws UserNotFoundException;
    void deleteUser(Long id);
    User updateUser(User user);
    List<User> listUsers();
    List<User> searchUser(String keyword);



    //=====================================================================================================//
    InternetMobileVPNDTO saveInternetMobileVPN(InternetMobileVPNDTO internetMobileVPNDTO);
    InternetMobileDTO saveInternetMobile(InternetMobileDTO internetMobileDTO);
    GsmDTO saveGsm(GsmDTO gsmDTO);
    FixVpnAdslVpnLLDTO saveFixVpnAdslVpnLL(FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO);

    LigneTelephoniqueDTO getLigneTelephonique(Long id) throws LigneTelephoniqueNotFoundException;

    List<LigneTelephoniqueDTO> ligneTelephoniqueList();

    List<LigneTelephoniqueDTO> searchLigneTelephonique(String keyword);

}

