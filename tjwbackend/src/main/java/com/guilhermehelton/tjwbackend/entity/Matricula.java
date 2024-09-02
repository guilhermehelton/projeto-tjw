package com.guilhermehelton.tjwbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_matricula")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Matricula {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_aluno")
    private Aluno idAluno;

    @ManyToOne
    @JoinColumn(name = "id_turma")
    private Turma idTurma;
}
