package com.telephone.backendtelephonelines.services;

import com.telephone.backendtelephonelines.entities.User;
import com.telephone.backendtelephonelines.exceptions.UserNotFoundException;

import java.util.List;

public interface UserServices {


    User saveUser(User user);
    User getUser(Long userId) throws UserNotFoundException;
    void deleteUser(Long id);
    User updateUser(User user);
    List<User> listUsers();
    List<User> searchUser(String keyword);
}
