package com.guilhermehelton.tjwbackend.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

    @Column(name = "semestre", length = 11)
    private String semestre;
    
    @OneToOne
    private Disciplina disciplina;

    @ManyToOne
    private Professor professor;

    @OneToMany(mappedBy = "turma")
    private List<Matricula> alunos;
}
