package com.uni.online_communications.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.exception.UserNotFoundException;
import com.uni.online_communications.models.User;
import com.uni.online_communications.repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByName(String username) {
        return userRepository.findByUsernameAndIsDeletedFalse(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with name: " + username));
    }

    public User createNewUser(String username, String password, String email) {
        if (userRepository.findByUsernameAndIsDeletedFalse(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        if (userRepository.findByEmailAndIsDeletedFalse(email).isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User not found"));

        if (user.getIsDeleted()) {
            throw new UserNotFoundException("User already deleted");
        }

        user.setIsDeleted(true);

        userRepository.save(user);
    }
}
