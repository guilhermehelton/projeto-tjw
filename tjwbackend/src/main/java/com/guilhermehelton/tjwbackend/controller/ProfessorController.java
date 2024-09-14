package com.guilhermehelton.tjwbackend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilhermehelton.tjwbackend.dto.ProfessorInputTO;
import com.guilhermehelton.tjwbackend.entity.Professor;
import com.guilhermehelton.tjwbackend.service.ProfessorService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("professor")
public class ProfessorController {

    @Autowired
    private ProfessorService service;

    @GetMapping("/")
    public List<Professor> listarProfessores() {
        return service.listarProfessor();
    }

    @PostMapping("/criar")
    public Professor criarProfessor(@RequestBody ProfessorInputTO professor) {
        return service.salvaProfessor(professor);    
    }
    
    @PutMapping("/atualizar/{id}")
    public Professor atualizarProfessor(@PathVariable Long id, @RequestBody ProfessorInputTO professor) {
        return service.atualizarProfessor(id, professor);
    }

    @DeleteMapping("/{id}")
    public void removerProfessor(@PathVariable Long id) {
        service.removerProfessor(id);
    }
}
