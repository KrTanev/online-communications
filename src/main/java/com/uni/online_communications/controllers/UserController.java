package com.uni.online_communications.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.models.User;
import com.uni.online_communications.services.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username) {
        User user = userService.getUserByName(username);

        return ResponseEntity.ok(user);
    }

    @PostMapping
    public User createNewUser(@RequestBody User user) {
        return userService.createNewUser(user.getUsername(), user.getPassword(), user.getEmail());
    }

    @PutMapping("/verify")
    public ResponseEntity<User> verifyUser(@RequestBody User user) {
        User foundUser = userService.verifyUser(user.getEmail(), user.getPassword());

        // HandleError
        return ResponseEntity.ok(foundUser);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);

        return ResponseEntity.ok().build();
    }

}
