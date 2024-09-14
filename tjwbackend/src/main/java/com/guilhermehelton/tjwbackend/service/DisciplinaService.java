package com.guilhermehelton.tjwbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.entity.Disciplina;
import com.guilhermehelton.tjwbackend.entity.Turma;
import com.guilhermehelton.tjwbackend.repository.DisciplinaRepository;
import com.guilhermehelton.tjwbackend.repository.TurmaRepository;

@Service
public class DisciplinaService {
    @Autowired
    private DisciplinaRepository repository;

    @Autowired
    private TurmaRepository turmaRepository;

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

    public void removerDisciplina(Long id) {
        Optional<Disciplina> disciplina = repository.findById(id);

        if(disciplina.isPresent()) {
            List<Turma> turmas = turmaRepository.findByDisciplina(disciplina.get());

            for(Turma turma : turmas) {
                turma.setDisciplina(null);
                turmaRepository.save(turma);
            }

            repository.deleteById(id);
        }
    }
}
