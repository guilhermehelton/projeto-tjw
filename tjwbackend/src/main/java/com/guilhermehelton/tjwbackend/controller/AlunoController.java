package com.guilhermehelton.tjwbackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("aluno")
public class AlunoController {
    @GetMapping("/")
    public String listarAlunos() {
        return "Bem vindo!";
    }
    
}
