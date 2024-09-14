package com.guilhermehelton.tjwbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilhermehelton.tjwbackend.dto.DisciplinaInputTO;
import com.guilhermehelton.tjwbackend.entity.Disciplina;
import com.guilhermehelton.tjwbackend.service.DisciplinaService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/disciplina")
public class DisciplinaController {
    @Autowired
    private DisciplinaService service;

    @GetMapping("/")
    public List<Disciplina> listarDisciplina() {
        return service.listarDisciplinas();
    }
    
    @PostMapping("/criar")
    public Disciplina criarDisciplina(@RequestBody DisciplinaInputTO disciplina) {
        return service.criarDisciplina(disciplina.getNome());
    }
    
    @PutMapping("atualizar/{id}")
    public Disciplina atualizarDisciplina(@PathVariable Long id, @RequestBody DisciplinaInputTO disciplina) {
        return service.atualizarDisciplina(id, disciplina.getNome());
    }

    @DeleteMapping("{id}")
    public void removerDisciplina(@PathVariable Long id) {
        service.removerDisciplina(id);
    }
}
