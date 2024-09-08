package com.guilhermehelton.tjwbackend.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_aluno")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "nome", nullable = false, length = 64)
    private String nome;

    @Column(name = "cpf", nullable = false, length = 64)
    private String cpf;

    @Column(name = "email", nullable = false, length = 64)
    private String email;

    @Column(name = "telefone", nullable = false, length = 32)
    private String telefone;

    @OneToMany
    @JoinTable(name = "tbl_matricula", joinColumns = @JoinColumn(name = "id_turma"), inverseJoinColumns = @JoinColumn(name = "id_aluno"))
    private List<Matricula> matriculas;

    @Column(name = "dataNascimento")
    private LocalDate dataNascimento;
}
