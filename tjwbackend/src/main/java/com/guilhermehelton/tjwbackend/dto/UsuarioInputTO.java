package com.guilhermehelton.tjwbackend.dto;

import org.springframework.data.repository.NoRepositoryBean;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoRepositoryBean
public class UsuarioInputTO {
    private String email;

    private String senha;
}
