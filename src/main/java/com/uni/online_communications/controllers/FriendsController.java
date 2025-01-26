package com.uni.online_communications.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.models.Friend;
import com.uni.online_communications.models.User;
import com.uni.online_communications.services.FriendsService;
import com.uni.online_communications.services.UserService;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {
    private final FriendsService friendService;
    private final UserService userService;

    public FriendsController(FriendsService friendsService, UserService userService) {
        this.friendService = friendsService;
        this.userService = userService;
    }

    public class FriendsResponse {
        Long friendId;
        String friendName;
        String friendEmail;
    }

    @GetMapping("/forUser/{userId}")
    public ResponseEntity<List<FriendsResponse>> getAllFriendsForUser(@PathVariable Long userId) {
        List<Friend> friends = friendService.getAllFriendsForUser(userId);
        List<User> users = userService.getAllUsers();

        List<FriendsResponse> foundFriends = friends.stream()
                .map(foundFriend -> {
                    FriendsResponse response = new FriendsResponse();
                    response.friendId = foundFriend.getId();

                    Long friendToSearchData = foundFriend.getFriendOne() == userId
                            ? foundFriend.getFriendTwo()
                            : foundFriend.getFriendOne();

                    response.friendName = users.stream()
                            .filter(user -> user.getId().equals(friendToSearchData))
                            .findFirst().get().getUsername();
                    response.friendEmail = users.stream()
                            .filter(user -> user.getId().equals(friendToSearchData))
                            .findFirst().get().getEmail();
                    return response;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(foundFriends);
    }

    @PostMapping("/addFriend/{userId}/{friendId}")
    public ResponseEntity<Void> addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        friendService.addFriend(userId, friendId);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/deleteFriend/{userId}/{friendId}")
    public ResponseEntity<Void> deleteFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        friendService.softDeleteFriend(userId, friendId);

        return ResponseEntity.ok().build();
    }
}
