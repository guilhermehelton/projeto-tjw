package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermehelton.tjwbackend.entity.Disciplina;
import com.guilhermehelton.tjwbackend.entity.Professor;
import com.guilhermehelton.tjwbackend.entity.Turma;
import java.util.List;


@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long>{
    List<Turma> findByProfessor(Professor professor);

    List<Turma> findByDisciplina(Disciplina disciplina);
}
