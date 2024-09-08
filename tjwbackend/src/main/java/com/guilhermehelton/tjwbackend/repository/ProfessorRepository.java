package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermehelton.tjwbackend.entity.Professor;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long>{
}
