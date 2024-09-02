package com.guilhermehelton.tjwbackend.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_turma")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @OneToOne
    private Disciplina disciplina;

    @ManyToOne
    private Professor professor;

    @OneToMany
    @JoinTable(name = "tbl_matricula", joinColumns = @JoinColumn(name = "id_aluno"), inverseJoinColumns = @JoinColumn(name = "id_turma"))
    private List<Matricula> alunos;
}
