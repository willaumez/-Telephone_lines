package com.telephone.backendtelephonelines.web;


import com.telephone.backendtelephonelines.entities.User;
import com.telephone.backendtelephonelines.exceptions.UserNotFoundException;
import com.telephone.backendtelephonelines.services.UserServices;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
@CrossOrigin("*")
public class UserRestController {
    private UserServices userServices;

    @GetMapping("/users")
    public List<User> customers() {
        return userServices.listUsers();
    }

    @GetMapping("/users/search")
    public List<User> searchUsers(@RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return userServices.searchUser("%"+keyword+"%");
    }

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable(name = "id") Long userId) throws UserNotFoundException {
        return userServices.getUser(userId);
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User user) {
        return userServices.saveUser(user);
    }

    @PutMapping("/users/{userId}")
    public User updateUser(@PathVariable Long userId, @RequestBody User user) {
        user.setId(userId);
        return userServices.updateUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userServices.deleteUser(id);
    }




}
