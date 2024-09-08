package com.guilhermehelton.tjwbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.dto.AlunoInputTO;
import com.guilhermehelton.tjwbackend.entity.Aluno;
import com.guilhermehelton.tjwbackend.repository.AlunoRepository;
import com.guilhermehelton.tjwbackend.utils.DateUtils;

@Service
public class AlunoService {
    @Autowired
    private AlunoRepository repository;

    public Aluno salvarAluno(AlunoInputTO aluno) {
        Aluno novoAluno = new Aluno();
        novoAluno.setNome(aluno.getNome());
        novoAluno.setEmail(aluno.getEmail());
        novoAluno.setCpf(aluno.getCpf());
        novoAluno.setTelefone(aluno.getTelefone());
        novoAluno.setDataNascimento(DateUtils.convertStringToLocalDate(aluno.getDataNascimento()));

        Aluno alunoSalvo = repository.save(novoAluno);

        return alunoSalvo;
    }

    public List<Aluno> listarAlunos() {
        return repository.findAll();
    }

    public Aluno atualizarAluno(Long id, AlunoInputTO aluno) {
        Optional<Aluno> optionalNovoAluno = repository.findById(id);

        if (optionalNovoAluno.isPresent()) {
            Aluno novoAluno = optionalNovoAluno.get();

            novoAluno.setNome(aluno.getNome());
            novoAluno.setEmail(aluno.getEmail());
            novoAluno.setCpf(aluno.getCpf());
            novoAluno.setTelefone(aluno.getTelefone());
            novoAluno.setDataNascimento(DateUtils.convertStringToLocalDate(aluno.getDataNascimento()));

            repository.save(novoAluno);
            return novoAluno;
        }

        return null;
    }
}
