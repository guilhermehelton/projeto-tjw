package com.guilhermehelton.tjwbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlunoInputTO {
    private String nome;
    private String cpf;
    private String dataNascimento;
    private String telefone;
    private String email;
}
