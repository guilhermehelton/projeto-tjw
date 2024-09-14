package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.guilhermehelton.tjwbackend.entity.Matricula;

@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long>{
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tbl_matricula WHERE tbl_matricula.id_aluno = :idAluno", nativeQuery = true)
    public void deleteAllByIdAluno(@Param(value = "idAluno") Long idAluno);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM tbl_matricula WHERE tbl_matricula.id_turma = :idTurma", nativeQuery = true)
    public void deleteAllByIdTurma(@Param(value = "idTurma") Long idTurma);
}
