package com.guilhermehelton.tjwbackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilhermehelton.tjwbackend.dto.AlunoInputTO;
import com.guilhermehelton.tjwbackend.entity.Aluno;
import com.guilhermehelton.tjwbackend.service.AlunoService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("aluno")
public class AlunoController {
    @Autowired
    private AlunoService service;

    @GetMapping("/")
    public List<Aluno> listarAlunos() {
        return service.listarAlunos();
    }

    @PostMapping("/criar")
    public Aluno cadastrarAluno(@RequestBody AlunoInputTO aluno) {
        return service.salvarAluno(aluno);
    }

    @PutMapping("atualizar/{id}")
    public Aluno atualizarAluno(@PathVariable Long id, @RequestBody AlunoInputTO aluno) {
        Aluno alunoAtualizado = service.atualizarAluno(id, aluno);
        return alunoAtualizado;
    }
    
    
}
