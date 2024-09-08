package com.guilhermehelton.tjwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfessorInputTO {
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String dataNascimento;
}
