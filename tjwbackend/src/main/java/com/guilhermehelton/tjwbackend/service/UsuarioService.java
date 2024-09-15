package com.guilhermehelton.tjwbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermehelton.tjwbackend.dto.UsuarioInputTO;
import com.guilhermehelton.tjwbackend.entity.Usuario;
import com.guilhermehelton.tjwbackend.repository.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario criarUsuario(UsuarioInputTO input) {
        List<Usuario> userExists = usuarioRepository.findByEmail(input.getEmail());

        if (!userExists.isEmpty()) {
            return null;
        }

        Usuario newUsuario = new Usuario();
        newUsuario.setEmail(input.getEmail());
        newUsuario.setSenha(input.getSenha());

        return usuarioRepository.save(newUsuario);
    }
}
