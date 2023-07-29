package com.telephone.backendtelephonelines;

import com.telephone.backendtelephonelines.dtos.FixVpnAdslVpnLLDTO;
import com.telephone.backendtelephonelines.dtos.GsmDTO;
import com.telephone.backendtelephonelines.dtos.InternetMobileDTO;
import com.telephone.backendtelephonelines.dtos.InternetMobileVPNDTO;
import com.telephone.backendtelephonelines.entities.User;
import com.telephone.backendtelephonelines.enums.*;
import com.telephone.backendtelephonelines.services.LigneTelephoniqueService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class BackendTelephoneLinesApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendTelephoneLinesApplication.class, args);
    }

    @Bean
    CommandLineRunner start(LigneTelephoniqueService ligneTelephoniqueService) {

        return args -> {


            /*Stream.of("0696647846", "0656647847", "0696747847", "0696456847", "0696768747", "0693454847",
                    "0689037847","069664784600", "065664784700", "069674784700", "069645684700", "069676874700", "069345484700").forEach(numero -> {
                InternetMobileDTO internetMobileDTO = new InternetMobileDTO();
                internetMobileDTO.setNumeroLigne(numero);
                internetMobileDTO.setEtat(EtatType.ACTIF);
                internetMobileDTO.setCodePIN("PIN-1234");
                internetMobileDTO.setCodePUK("PUK-1234");
                internetMobileDTO.setAffectation("Affectation");
                internetMobileDTO.setFonction("Fonction");
                internetMobileDTO.setPoste("Poste");
                internetMobileDTO.setMontant(10000.0);
                internetMobileDTO.setNumeroSerie(UUID.randomUUID().toString());
                internetMobileDTO.setDateLivraison(new Date());
                ligneTelephoniqueService.saveInternetMobile(internetMobileDTO);
            });


            Stream.of("0796647866", "0756647847", "0796747847", "0796456877", "0797768747", "0793455647", "0787897847",
                    "079664786600", "075664784700", "079674784700", "079645687700", "079776874700", "079345564700", "078789784700").forEach(numero -> {
                InternetMobileVPNDTO internetMobileVPNDTO = new InternetMobileVPNDTO();
                internetMobileVPNDTO.setNumeroLigne(numero);
                internetMobileVPNDTO.setEtat(EtatType.ACTIF);
                internetMobileVPNDTO.setAffectation("Affectation");
                internetMobileVPNDTO.setPoste("Poste");
                internetMobileVPNDTO.setMontant(10000.0);
                internetMobileVPNDTO.setNumeroSerie(UUID.randomUUID().toString());
                internetMobileVPNDTO.setDateLivraison(new Date());
                ligneTelephoniqueService.saveInternetMobileVPN(internetMobileVPNDTO);
            });


            Stream.of("0596655846", "0543457847", "0596666847", "0596478947", "0596345747", "0592344847", "0589076847").forEach(numero -> {
                GsmDTO gsmDTO = new GsmDTO();
                gsmDTO.setNumeroLigne(numero);
                gsmDTO.setEtat(EtatType.ACTIF);
                gsmDTO.setCodePIN("PIN-1234");
                gsmDTO.setCodePUK("PUK-1234");
                gsmDTO.setAffectation("Affectation");
                gsmDTO.setFonction("Fonction");
                gsmDTO.setNature(NatureType.POINT_DE_VENTE);
                gsmDTO.setForfait(ForfaitType._50G);
                gsmDTO.setNomPrenom("NomPrenom");
                gsmDTO.setPoste("Poste");
                gsmDTO.setMontant(10000.0);
                gsmDTO.setNumeroSerie(UUID.randomUUID().toString());
                gsmDTO.setDateLivraison(new Date());
                ligneTelephoniqueService.saveGsm(gsmDTO);
            });


            Stream.of("0711147866", "0710047847", "0711147847", "0711156877", "0711168747", "0711155647", "0711197847").forEach(numero -> {
                FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO = new FixVpnAdslVpnLLDTO();
                fixVpnAdslVpnLLDTO.setNumeroLigne(numero);
                fixVpnAdslVpnLLDTO.setEtat(EtatType.ACTIF);
                fixVpnAdslVpnLLDTO.setAffectation("Affectation");
                fixVpnAdslVpnLLDTO.setPoste("Poste");
                fixVpnAdslVpnLLDTO.setMontant(10000.0);
                fixVpnAdslVpnLLDTO.setNumeroSerie(UUID.randomUUID().toString());
                fixVpnAdslVpnLLDTO.setAdresseIp(numero + "00000");
                fixVpnAdslVpnLLDTO.setCategorie(Categorie.FIX);
                fixVpnAdslVpnLLDTO.setDebit(DebitType._1M);
                fixVpnAdslVpnLLDTO.setDateLivraison(new Date());

                ligneTelephoniqueService.saveFixVpnAdslVpnLL(fixVpnAdslVpnLLDTO);
            });


            Stream.of("Owani", "Sana", "Jence", "Williams").forEach(username -> {
                User user = new User();
                user.setUsername(username);
                user.setEmail(username+"@gmail.com");
                user.setPassword("admin");
                user.setRole(RoleType.ADMIN);
                ligneTelephoniqueService.saveUser(user);
            });
            Stream.of("Hassan", "Yassine", "Aicha", "jency").forEach(username -> {
                User user = new User();
                user.setUsername(username);
                user.setEmail(username+"@gmail.com");
                user.setPassword("admin");
                user.setRole(RoleType.USER);
                ligneTelephoniqueService.saveUser(user);
            });*/
        };
    }

}
