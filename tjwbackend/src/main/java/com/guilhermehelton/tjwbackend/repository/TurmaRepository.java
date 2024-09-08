package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermehelton.tjwbackend.entity.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long>{
    
}
