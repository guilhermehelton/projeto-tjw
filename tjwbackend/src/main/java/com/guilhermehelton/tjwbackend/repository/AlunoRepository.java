package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermehelton.tjwbackend.entity.Aluno;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long>{
}
