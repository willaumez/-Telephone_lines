package com.telephone.backendtelephonelines;

import com.telephone.backendtelephonelines.entities.User;
import com.telephone.backendtelephonelines.services.UserServices;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.stream.Stream;

@SpringBootApplication
public class BackendTelephoneLinesApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendTelephoneLinesApplication.class, args);
    }


    @Bean
    CommandLineRunner start(UserServices userServices) {
        return args -> {
            /*Stream.of("Hassan", "Yassine", "Aicha", "Owani", "Sana", "Jency", "Williams").forEach(username -> {
                User user = new User();
                user.setUsername(username);
                user.setEmail(username+"@gmail.com");
                user.setPassword("admin");
                userServices.saveUser(user);
            });*/
        };
    }

}
