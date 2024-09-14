package com.guilhermehelton.tjwbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class TjwbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TjwbackendApplication.class, args);
	}

}
