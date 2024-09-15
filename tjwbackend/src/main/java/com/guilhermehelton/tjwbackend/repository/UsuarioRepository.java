package com.guilhermehelton.tjwbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.guilhermehelton.tjwbackend.entity.Usuario;
import java.util.List;


@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    @Query(value = "SELECT user FROM Usuario user WHERE user.email = :email")
    UserDetails findByLogin(@Param("email") String email);

    List<Usuario> findByEmail(String email);
}
