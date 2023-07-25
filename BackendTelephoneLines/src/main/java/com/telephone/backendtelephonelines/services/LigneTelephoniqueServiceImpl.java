package com.telephone.backendtelephonelines.services;

import com.telephone.backendtelephonelines.dtos.*;
import com.telephone.backendtelephonelines.entities.*;
import com.telephone.backendtelephonelines.exceptions.LigneTelephoniqueNotFoundException;
import com.telephone.backendtelephonelines.exceptions.UserNotFoundException;
import com.telephone.backendtelephonelines.mappers.LigneTelephoniqueMappers;
import com.telephone.backendtelephonelines.mappers.LigneTelephoniqueMappersImpl;
import com.telephone.backendtelephonelines.repositories.LigneTelephoniqueRepository;
import com.telephone.backendtelephonelines.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class LigneTelephoniqueServiceImpl implements LigneTelephoniqueService {

    private LigneTelephoniqueRepository ligneTelephoniqueRepository;
    private UserRepository userRepository;
    private LigneTelephoniqueMappers dtoMapper;


    /*public LigneTelephoniqueServiceImpl(LigneTelephoniqueMappers dtoMapper, LigneTelephoniqueRepository ligneTelephoniqueRepository) {
        this.dtoMapper = dtoMapper;
        this.ligneTelephoniqueRepository = ligneTelephoniqueRepository;
    }*/


    @Override
    public User saveUser(User user) {
        String password = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    @Override
    public User getUser(Long userId) throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("----- User Not found -----"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) {
        if (user.getPassword() != null) {
            String password = user.getPassword();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(password);
            user.setPassword(hashedPassword);
        }
        return userRepository.save(user);
    }

    @Override
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> searchUser(String keyword) {
        return userRepository.searchUser(keyword);
    }

    //==========================================================================================================//


    @Override
    public InternetMobileVPNDTO saveInternetMobileVPN(InternetMobileVPNDTO internetMobileVPNDTO) {
        InternetMobileVPN internetMobileVPN = dtoMapper.fromInternetMobileVPNDTO(internetMobileVPNDTO);
        InternetMobileVPN savedMobileVPN = ligneTelephoniqueRepository.save(internetMobileVPN);
        return dtoMapper.fromInternetMobileVPN(savedMobileVPN);
    }

    @Override
    public InternetMobileDTO saveInternetMobile(InternetMobileDTO internetMobileDTO) {
        InternetMobile internetMobile = dtoMapper.fromInternetMobileDTO(internetMobileDTO);
        InternetMobile savedMobile = ligneTelephoniqueRepository.save(internetMobile);
        return dtoMapper.fromInternetMobile(savedMobile);
    }

    @Override
    public GsmDTO saveGsm(GsmDTO gsmDTO) {
        Gsm gsm = dtoMapper.fromGsmDTO(gsmDTO);
        Gsm savedGsm = ligneTelephoniqueRepository.save(gsm);
        return dtoMapper.fromGsm(savedGsm);
    }

    @Override
    public FixVpnAdslVpnLLDTO saveFixVpnAdslVpnLL(FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO) {
        FixVpnAdslVpnLL fixVpnAdslVpnLL = dtoMapper.fromFixVpnAdslVpnLLDTO(fixVpnAdslVpnLLDTO);
        FixVpnAdslVpnLL savedFix = ligneTelephoniqueRepository.save(fixVpnAdslVpnLL);
        return dtoMapper.fromFixVpnAdslVpnLL(savedFix);
    }

    @Override
    public LigneTelephoniqueDTO getLigneTelephonique(Long id) throws LigneTelephoniqueNotFoundException {
        LigneTelephonique ligneTelephonique = ligneTelephoniqueRepository.findById(id)
                .orElseThrow(() -> new LigneTelephoniqueNotFoundException("Ligne Telephonique Introuvable!"));
        if (ligneTelephonique instanceof InternetMobile){
            InternetMobile internetMobile = (InternetMobile) ligneTelephonique;
            return dtoMapper.fromInternetMobile(internetMobile);
        } else if (ligneTelephonique instanceof InternetMobileVPN){
            InternetMobileVPN internetMobileVPN = (InternetMobileVPN) ligneTelephonique;
            return dtoMapper.fromInternetMobileVPN(internetMobileVPN);
        } else if (ligneTelephonique instanceof Gsm){
            Gsm gsm = (Gsm) ligneTelephonique;
            return dtoMapper.fromGsm(gsm);
        } else {
            FixVpnAdslVpnLL fixVpnAdslVpnLL = (FixVpnAdslVpnLL) ligneTelephonique;
            return dtoMapper.fromFixVpnAdslVpnLL(fixVpnAdslVpnLL);
        }
    }

    @Override
    public List<LigneTelephoniqueDTO> ligneTelephoniqueList() {
        List<LigneTelephonique> ligneTelephoniques = ligneTelephoniqueRepository.findAll();
        return ligneTelephoniques.stream().map(ligneTelephonique -> {
            if (ligneTelephonique instanceof InternetMobile internetMobile){
                return dtoMapper.fromInternetMobile(internetMobile);
            } else if (ligneTelephonique instanceof InternetMobileVPN internetMobileVPN){
                return dtoMapper.fromInternetMobileVPN(internetMobileVPN);
            } else if (ligneTelephonique instanceof Gsm gsm){
                return dtoMapper.fromGsm(gsm);
            } else {
                FixVpnAdslVpnLL fixVpnAdslVpnLL = (FixVpnAdslVpnLL) ligneTelephonique;
                return dtoMapper.fromFixVpnAdslVpnLL(fixVpnAdslVpnLL);
            }
        }).collect(Collectors.toList());
    }

    /*@Override
    public List<LigneTelephoniqueDTO> ligneTelephoniqueList() {
        List<LigneTelephonique> ligneTelephoniques = ligneTelephoniqueRepository.findAll();
        List<LigneTelephoniqueDTO> ligneTelephoniqueDTOS = ligneTelephoniques.stream().map(ligneTelephonique -> {
            if (ligneTelephonique instanceof InternetMobile){
                InternetMobile internetMobile = (InternetMobile) ligneTelephonique;
                return dtoMapper.fromInternetMobile(internetMobile);
            } else if (ligneTelephonique instanceof InternetMobileVPN){
                InternetMobileVPN internetMobileVPN = (InternetMobileVPN) ligneTelephonique;
                return dtoMapper.fromInternetMobileVPN(internetMobileVPN);
            } else if (ligneTelephonique instanceof Gsm){
                Gsm gsm = (Gsm) ligneTelephonique;
                return dtoMapper.fromGsm(gsm);
            } else {
                FixVpnAdslVpnLL fixVpnAdslVpnLL = (FixVpnAdslVpnLL) ligneTelephonique;
                return dtoMapper.fromFixVpnAdslVpnLL(fixVpnAdslVpnLL);
            }
        }).collect(Collectors.toList());
        return ligneTelephoniqueDTOS;
    }*/

    @Override
    public List<LigneTelephoniqueDTO> searchLigneTelephonique(String keyword) {
        List<LigneTelephonique> ligneTelephoniques = ligneTelephoniqueRepository.searchLigneTelephonique(keyword);
        return ligneTelephoniques.stream().map(ligneTelephonique -> {
            if (ligneTelephonique instanceof InternetMobile internetMobile){
                return dtoMapper.fromInternetMobile(internetMobile);
            } else if (ligneTelephonique instanceof InternetMobileVPN internetMobileVPN){
                return dtoMapper.fromInternetMobileVPN(internetMobileVPN);
            } else if (ligneTelephonique instanceof Gsm gsm){
                return dtoMapper.fromGsm(gsm);
            } else {
                FixVpnAdslVpnLL fixVpnAdslVpnLL = (FixVpnAdslVpnLL) ligneTelephonique;
                return dtoMapper.fromFixVpnAdslVpnLL(fixVpnAdslVpnLL);
            }
        }).collect(Collectors.toList());
    }
}

