package com.guilhermehelton.tjwbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.dto.ProfessorInputTO;
import com.guilhermehelton.tjwbackend.entity.Professor;
import com.guilhermehelton.tjwbackend.repository.ProfessorRepository;
import com.guilhermehelton.tjwbackend.utils.DateUtils;

@Service
public class ProfessorService {
    @Autowired
    private ProfessorRepository repository;

    public Professor salvaProfessor(ProfessorInputTO professor) {
        Professor novoProfessor = new Professor();
        novoProfessor.setNome(professor.getNome());
        novoProfessor.setEmail(professor.getEmail());
        novoProfessor.setTelefone(professor.getTelefone());
        novoProfessor.setDataNascimento(DateUtils.convertStringToLocalDate(professor.getDataNascimento()));
        novoProfessor.setCpf(professor.getCpf());

        return repository.save(novoProfessor);
    }

    public List<Professor> listarProfessor() {
        return repository.findAll();
    }

    public Professor atualizarProfessor(Long id, ProfessorInputTO professor) {
        Optional<Professor> optionalProfessor = repository.findById(id);

        if(optionalProfessor.isPresent()) {
            Professor novoProfessor = optionalProfessor.get();

            novoProfessor.setNome(professor.getNome());
            novoProfessor.setEmail(professor.getEmail());
            novoProfessor.setTelefone(professor.getTelefone());
            novoProfessor.setDataNascimento(DateUtils.convertStringToLocalDate(professor.getDataNascimento()));
            novoProfessor.setCpf(professor.getCpf());

            return novoProfessor;
        }

        return null;
    }
}
