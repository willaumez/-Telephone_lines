package com.telephone.backendtelephonelines.web;

import com.telephone.backendtelephonelines.dtos.*;
import com.telephone.backendtelephonelines.entities.InternetMobileVPN;
import com.telephone.backendtelephonelines.exceptions.LigneTelephoniqueNotFoundException;
import com.telephone.backendtelephonelines.services.LigneTelephoniqueService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class LigneTelephoniqueRestAPI {

    private LigneTelephoniqueService ligneTelephoniqueService;

   private LigneTelephoniqueRestAPI(LigneTelephoniqueService ligneTelephoniqueService){
        this.ligneTelephoniqueService = ligneTelephoniqueService;
    }

    @GetMapping("/lignes")
    public List<LigneTelephoniqueDTO> listLignesTelephoniques() {
        return ligneTelephoniqueService.ligneTelephoniqueList();
    }

    @GetMapping("/lignes/{ligneId}")
    public LigneTelephoniqueDTO getLigneTelephoniqueById(@PathVariable Long ligneId) throws LigneTelephoniqueNotFoundException {
        return ligneTelephoniqueService.getLigneTelephonique(ligneId);
    }

    @GetMapping("/lignes/search")
    public List<LigneTelephoniqueDTO> searchLigneTelephonique(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return ligneTelephoniqueService.searchLigneTelephonique("%" + keyword + "%");
    }

    //====================  save  ======================//
    @PostMapping("/ligne/saveInternetMobileVPN")
    public InternetMobileVPNDTO saveInternetMobileVPN(@RequestBody InternetMobileVPNDTO internetMobileVPNDTO){
        System.out.println("saveInternetMobileVPN--"+internetMobileVPNDTO);
        this.ligneTelephoniqueService.saveInternetMobileVPN(internetMobileVPNDTO);
        return internetMobileVPNDTO;
    }

    @PostMapping("/ligne/saveInternetMobile")
    public InternetMobileDTO saveInternetMobile(@RequestBody InternetMobileDTO internetMobileDTO){
        System.out.println("saveInternetMobile--"+internetMobileDTO);
        this.ligneTelephoniqueService.saveInternetMobile(internetMobileDTO);
        return internetMobileDTO;
    }

    @PostMapping("/ligne/saveGsm")
    public GsmDTO saveGsm(@RequestBody GsmDTO gsmDTO){
        System.out.println("saveGsm--"+gsmDTO);
        this.ligneTelephoniqueService.saveGsm(gsmDTO);
        return gsmDTO;
    }

    @PostMapping("/ligne/saveFix")
    public FixVpnAdslVpnLLDTO saveFixVpnAdslVpnLL(@RequestBody FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO){
        System.out.println("Web:  saveFixVpnAdslVpnLL--"+fixVpnAdslVpnLLDTO);
        this.ligneTelephoniqueService.saveFixVpnAdslVpnLL(fixVpnAdslVpnLLDTO);
        return fixVpnAdslVpnLLDTO;
    }

    //====================  delete  ======================//
    @DeleteMapping("/ligne/deleteLigne/{id}")
    public void deleteLigneTelephonique(@PathVariable Long id){
        System.out.println("deleteLigneTelephonique:  "+id);
        this.ligneTelephoniqueService.deleteLigneTelephonique(id);
    }

    //====================  update  ======================//
    @PutMapping("/updateInternetMobileVPN")
    public InternetMobileVPNDTO updateInternetMobileVPN(@RequestBody InternetMobileVPNDTO internetMobileVPNDTO) {
        return ligneTelephoniqueService.updateInternetMobileVPN(internetMobileVPNDTO);
    }
    @PutMapping("/updateInternetMobile")
    public InternetMobileDTO updateInternetMobile(@RequestBody InternetMobileDTO internetMobileDTO) {
        return ligneTelephoniqueService.updateInternetMobile(internetMobileDTO);
    }
    @PutMapping("/updateGsm")
    public GsmDTO updateGsm( @RequestBody GsmDTO gsmDTO) {
        return ligneTelephoniqueService.updateGsm(gsmDTO);
    }
    @PutMapping("/updateFix")
    public FixVpnAdslVpnLLDTO updateFix(@RequestBody FixVpnAdslVpnLLDTO fixVpnAdslVpnLLDTO) {
        return ligneTelephoniqueService.updateFix(fixVpnAdslVpnLLDTO);
    }


}
