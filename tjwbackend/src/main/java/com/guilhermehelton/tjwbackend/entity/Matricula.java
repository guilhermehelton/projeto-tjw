package com.guilhermehelton.tjwbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

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
    @JsonIgnore
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_aluno")
    @JsonUnwrapped
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "id_turma")
    @JsonIgnore
    private Turma turma;
}
