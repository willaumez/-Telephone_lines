package com.telephone.backendtelephonelines.services;

import com.telephone.backendtelephonelines.entities.User;
import com.telephone.backendtelephonelines.exceptions.UserNotFoundException;
import com.telephone.backendtelephonelines.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class UserServicesImpl implements UserServices {

    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        String password = user.getPassword();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    @Override
    public User getUser(Long userId) throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("----- User Not found -----"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUser(User user) {
        if (user.getPassword() != null) {
            String password = user.getPassword();
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode(password);
            user.setPassword(hashedPassword);
        }
        return userRepository.save(user);
    }

    @Override
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User> searchUser(String keyword) {
        return userRepository.searchUser(keyword);
    }
}
