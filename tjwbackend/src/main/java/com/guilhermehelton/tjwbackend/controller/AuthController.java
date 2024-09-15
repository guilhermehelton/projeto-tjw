package com.guilhermehelton.tjwbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guilhermehelton.tjwbackend.config.TokenService;
import com.guilhermehelton.tjwbackend.dto.LoginResponseTO;
import com.guilhermehelton.tjwbackend.dto.LoginTO;
import com.guilhermehelton.tjwbackend.dto.UsuarioInputTO;
import com.guilhermehelton.tjwbackend.entity.Usuario;
import com.guilhermehelton.tjwbackend.service.AuthorizationService;
import com.guilhermehelton.tjwbackend.service.UsuarioService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthorizationService authorizationService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity loginController(@RequestBody LoginTO usuarioInput) {
        var matriculaPassword = new UsernamePasswordAuthenticationToken(usuarioInput.getEmail(),
                usuarioInput.getSenha());
        var auth = this.authenticationManager.authenticate(matriculaPassword);

        var token = tokenService.generateToken((Usuario) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseTO(token, (Usuario) auth.getPrincipal()));

    }

    @PostMapping("/register")
    public ResponseEntity<Object> registrarUsuarioController(@RequestBody UsuarioInputTO usuarioInput) {
        if (authorizationService.loadUserByUsername(usuarioInput.getEmail()) != null) {
            return ResponseEntity.badRequest().build();
        }

        String encryptedPass = new BCryptPasswordEncoder().encode(usuarioInput.getSenha());
        usuarioInput.setSenha(encryptedPass);
        Usuario newUsuario = usuarioService.criarUsuario(usuarioInput);

        return ResponseEntity.ok().body(newUsuario);
    }

}
