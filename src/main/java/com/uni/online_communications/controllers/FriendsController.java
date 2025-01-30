package com.uni.online_communications.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.dto.response.FriendsResponse;
import com.uni.online_communications.models.Friend;
import com.uni.online_communications.models.User;
import com.uni.online_communications.services.FriendsService;
import com.uni.online_communications.services.UserService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/friends")
public class FriendsController {
    private final FriendsService friendService;
    private final UserService userService;

    public FriendsController(FriendsService friendsService, UserService userService) {
        this.friendService = friendsService;
        this.userService = userService;
    }

    @GetMapping("/forUser/{userId}")
    public ResponseEntity<List<FriendsResponse>> getAllFriendsForUser(@PathVariable Long userId) {
        List<Friend> friends = friendService.getAllFriendsForUser(userService.getUserById(userId));
        List<User> users = userService.getAllUsers();

        List<FriendsResponse> foundFriends = friends.stream()
                .map(foundFriend -> {
                    FriendsResponse response = new FriendsResponse();

                    Long friendToSearchData = foundFriend.getFriendOne().getId().equals(userId)
                            ? foundFriend.getFriendTwo().getId()
                            : foundFriend.getFriendOne().getId();

                    response.setFriendshipId(foundFriend.getId());
                    response.setFriendId(friendToSearchData);
                    response.setFriendName(users.stream()
                            .filter(user -> user.getId().equals(friendToSearchData))
                            .findFirst().get().getUsername());

                    response.setFriendEmail(users.stream()
                            .filter(user -> user.getId().equals(friendToSearchData))
                            .findFirst().get().getEmail());
                    return response;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(foundFriends);
    }

    @PostMapping("/addFriend/{userId}/{friendId}")
    public ResponseEntity<String> addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        friendService.addFriend(userService.getUserById(userId), userService.getUserById(friendId));

        return ResponseEntity.ok().body("Successfully added friend.");
    }

    @PutMapping("/deleteFriend/{userId}/{friendId}")
    public ResponseEntity<String> deleteFriend(@PathVariable Long userId, @PathVariable Long friendId) {

        friendService.softDeleteFriend(userService.getUserById(userId), userService.getUserById(friendId));

        return ResponseEntity.ok().body("Successfully deleted friend.");
    }
}
