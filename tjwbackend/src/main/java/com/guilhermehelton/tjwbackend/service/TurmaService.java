package com.guilhermehelton.tjwbackend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.dto.TurmaInputTO;
import com.guilhermehelton.tjwbackend.entity.Aluno;
import com.guilhermehelton.tjwbackend.entity.Matricula;
import com.guilhermehelton.tjwbackend.entity.Turma;
import com.guilhermehelton.tjwbackend.repository.MatriculaRepository;
import com.guilhermehelton.tjwbackend.repository.TurmaRepository;

@Service
public class TurmaService {
    @Autowired
    private TurmaRepository repository;

    @Autowired
    private MatriculaRepository matricula;

    public Turma salvarTurma(TurmaInputTO turma) {
        Turma novaTurma = new Turma();
        novaTurma.setDisciplina(turma.getDisciplina());
        novaTurma.setProfessor(turma.getProfessor());

        Turma turmaSalva = repository.save(novaTurma);

        List<Matricula> alunosMatriculados = new ArrayList<>();

        for (Aluno aluno : turma.getAlunos()) {
            Matricula novaMatricula = new Matricula();

            novaMatricula.setIdAluno(aluno);
            novaMatricula.setIdTurma(turmaSalva);

            alunosMatriculados.add(matricula.save(novaMatricula));
        }

        turmaSalva.setAlunos(alunosMatriculados);

        return turmaSalva;
    }

    public List<Turma> listarTurmas() {
        return repository.findAll();
    }

    public Turma atualizarTurma(Long id, TurmaInputTO turma) {
        Optional<Turma> optionalNovaTurma = repository.findById(id);

        if (optionalNovaTurma.isPresent()) {
            Turma novaTurma = optionalNovaTurma.get();
            novaTurma.setDisciplina(turma.getDisciplina());
            novaTurma.setProfessor(turma.getProfessor());

            Turma turmaSalva = repository.save(novaTurma);

            List<Matricula> alunosMatriculados = new ArrayList<>();

            for (Aluno aluno : turma.getAlunos()) {
                Matricula novaMatricula = new Matricula();

                novaMatricula.setIdAluno(aluno);
                novaMatricula.setIdTurma(turmaSalva);

                alunosMatriculados.add(matricula.save(novaMatricula));
            }

            turmaSalva.setAlunos(alunosMatriculados);

            return repository.save(turmaSalva);
        }

        return null;
    }
}
