package com.guilhermehelton.tjwbackend.dto;

import java.util.List;

import com.guilhermehelton.tjwbackend.entity.Aluno;
import com.guilhermehelton.tjwbackend.entity.Disciplina;
import com.guilhermehelton.tjwbackend.entity.Professor;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TurmaInputTO {
    private Disciplina disciplina;
    private Professor professor;
    private List<Aluno> alunos;
}
