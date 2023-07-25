package com.telephone.backendtelephonelines.repositories;

import com.telephone.backendtelephonelines.entities.LigneTelephonique;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LigneTelephoniqueRepository extends JpaRepository<LigneTelephonique, Long> {

    @Query("select c from LigneTelephonique c where c.numeroSerie like :kw or c.numeroLigne like :kw or c.montant like :kw or c.affectation like :kw")
    List<LigneTelephonique> searchLigneTelephonique(@Param("kw") String keyword);


}
