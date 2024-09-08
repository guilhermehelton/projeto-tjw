package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermehelton.tjwbackend.entity.Matricula;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long>{
    
}
