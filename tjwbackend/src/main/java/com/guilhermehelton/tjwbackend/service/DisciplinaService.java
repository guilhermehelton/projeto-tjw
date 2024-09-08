package com.guilhermehelton.tjwbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.entity.Disciplina;
import com.guilhermehelton.tjwbackend.repository.DisciplinaRepository;

@Service
public class DisciplinaService {
    @Autowired
    private DisciplinaRepository repository;

    public Disciplina criarDisciplina(String nomeDisciplina) {
        Disciplina novaDisciplina = new Disciplina();
        novaDisciplina.setNome(nomeDisciplina);

        return repository.save(novaDisciplina);
    }

    public List<Disciplina> listarDisciplinas() {
        return repository.findAll();
    }

    public Disciplina atualizarDisciplina(Long id, String nomeDisciplina) {
        Disciplina novaDisciplina = repository.findById(id).get();
        novaDisciplina.setNome(nomeDisciplina);

        return repository.save(novaDisciplina);
    }
}
