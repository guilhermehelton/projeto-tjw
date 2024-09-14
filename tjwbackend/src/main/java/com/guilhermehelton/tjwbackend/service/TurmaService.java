package com.guilhermehelton.tjwbackend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.dto.TurmaInputTO;
import com.guilhermehelton.tjwbackend.entity.Aluno;
import com.guilhermehelton.tjwbackend.entity.Disciplina;
import com.guilhermehelton.tjwbackend.entity.Matricula;
import com.guilhermehelton.tjwbackend.entity.Professor;
import com.guilhermehelton.tjwbackend.entity.Turma;
import com.guilhermehelton.tjwbackend.repository.DisciplinaRepository;
import com.guilhermehelton.tjwbackend.repository.MatriculaRepository;
import com.guilhermehelton.tjwbackend.repository.ProfessorRepository;
import com.guilhermehelton.tjwbackend.repository.TurmaRepository;

@Service
public class TurmaService {
    @Autowired
    private TurmaRepository repository;

    @Autowired
    private MatriculaRepository matricula;

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    public Turma salvarTurma(TurmaInputTO turma) {
        Turma novaTurma = new Turma();

        Disciplina disciplina = disciplinaRepository.findById(turma.getDisciplina().getId()).get();
        Professor professor = professorRepository.findById(turma.getProfessor().getId()).get();

        novaTurma.setSemestre(turma.getSemestre());
        novaTurma.setDisciplina(disciplina);
        novaTurma.setProfessor(professor);

        Turma turmaSalva = repository.save(novaTurma);

        List<Matricula> alunosMatriculados = new ArrayList<>();

        for (Aluno aluno : turma.getAlunos()) {
            Matricula novaMatricula = new Matricula();

            novaMatricula.setAluno(aluno);
            novaMatricula.setTurma(turmaSalva);

            alunosMatriculados.add(matricula.save(novaMatricula));
        }

        turmaSalva.setAlunos(alunosMatriculados);

        repository.save(turmaSalva);

        return turmaSalva;
    }

    public List<Turma> listarTurmas() {
        return repository.findAll();
    }

    public Turma atualizarTurma(Long id, TurmaInputTO turma) {
        Optional<Turma> optionalNovaTurma = repository.findById(id);

        if (optionalNovaTurma.isPresent()) {
            Turma novaTurma = optionalNovaTurma.get();
            novaTurma.setSemestre(turma.getSemestre());
            novaTurma.setDisciplina(turma.getDisciplina());
            novaTurma.setProfessor(turma.getProfessor());

            Turma turmaSalva = repository.save(novaTurma);

            List<Matricula> alunosMatriculados = new ArrayList<>();

            alunosMatriculados.addAll(turmaSalva.getAlunos());

            for (Aluno aluno : turma.getAlunos()) {

                List<Matricula> alunoPreviamenteMatriculado = turmaSalva.getAlunos().stream()
                        .filter(m -> m.getAluno().getId().equals(aluno.getId()))
                        .collect(Collectors.toList());

                if (alunoPreviamenteMatriculado.size() == 0) {
                    Matricula novaMatricula = new Matricula();

                    novaMatricula.setAluno(aluno);
                    novaMatricula.setTurma(turmaSalva);

                    alunosMatriculados.add(matricula.save(novaMatricula));
                }
            }

            turmaSalva.setAlunos(alunosMatriculados);

            return repository.save(turmaSalva);
        }

        return null;
    }

    public void removerTurma(Long id) {
        Optional<Turma> turma = repository.findById(id);
        if (turma.isPresent()) {
            matricula.deleteAllByIdTurma(id);
            repository.deleteById(id);
        }
    }
}
