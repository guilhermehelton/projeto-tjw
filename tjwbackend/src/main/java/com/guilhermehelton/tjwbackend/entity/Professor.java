package com.guilhermehelton.tjwbackend.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tbl_professor")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Professor {
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

    @Column(name = "dataNascimento")
    private LocalDate dataNascimento;

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private List<Turma> leciona;
}
