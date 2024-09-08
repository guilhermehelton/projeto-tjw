package com.guilhermehelton.tjwbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilhermehelton.tjwbackend.dto.TurmaInputTO;
import com.guilhermehelton.tjwbackend.entity.Turma;
import com.guilhermehelton.tjwbackend.service.TurmaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("turma")
public class TurmaController {
    @Autowired
    private TurmaService service;

    @GetMapping("/")
    public List<Turma> listarTurmas() {
        return service.listarTurmas();
    }
    
    @PostMapping("/criar")
    public Turma criarTurma(@RequestBody TurmaInputTO turma) {
        return service.salvarTurma(turma);
    }

    @PutMapping("atualizar/{id}")
    public Turma atualizarTurma(@PathVariable Long id, @RequestBody TurmaInputTO turma) {
        return service.atualizarTurma(id, turma);
    }
    
}
