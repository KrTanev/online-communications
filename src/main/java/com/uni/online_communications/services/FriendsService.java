package com.uni.online_communications.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.models.Friend;
import com.uni.online_communications.models.User;
import com.uni.online_communications.repository.FriendRepository;

@Service
public class FriendsService {
    private final FriendRepository friendRepository;

    public FriendsService(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    public List<Friend> getAllFriendsForUser(User user) {
        List<Friend> foundFriends = friendRepository.findByFriendOneOrFriendTwoAndIsDeletedFalse(user, user);

        if (foundFriends.isEmpty()) {
            throw new IllegalArgumentException("No friends found for user with username: " + user.getUsername());
        }

        return foundFriends;
    }

    public void addFriend(User firstUser, User secondUser) {
        if (firstUser.equals(secondUser)) {
            throw new IllegalArgumentException("User cannot be friends with themselves");
        }

        Friend existingFriend = friendRepository.findByFriendOneAndFriendTwoAndIsDeletedTrue(firstUser, secondUser);
        if (existingFriend != null) {
            existingFriend.setIsDeleted(false);
            friendRepository.save(existingFriend);
            return;
        }

        if (friendRepository.existsByFriendOneAndFriendTwoAndIsDeletedFalse(firstUser, secondUser)) {
            throw new IllegalArgumentException("Users are already friends");
        }

        Friend reverseFriend = friendRepository.findByFriendOneAndFriendTwoAndIsDeletedFalse(secondUser, firstUser);
        if (reverseFriend != null) {
            throw new IllegalArgumentException("Users are already friends");
        }

        Friend friend = new Friend();
        friend.setFriendOne(firstUser);
        friend.setFriendTwo(secondUser);
        friend.setIsDeleted(false);

        friendRepository.save(friend);
    }

    public void softDeleteFriend(User userOne, User userTwo) {
        List<Friend> foundFriends = friendRepository.findByFriendOneOrFriendTwoAndIsDeletedFalse(userOne, userTwo);

        Friend foundFriend = null;

        for (Friend friend : foundFriends) {
            if (friend.getFriendOne().equals(userTwo) || friend.getFriendTwo().equals(userTwo)) {
                foundFriend = friend;
                break;
            }
        }

        if (foundFriend == null || foundFriend.getIsDeleted() == true) {
            throw new IllegalArgumentException("Users are not friends");
        }

        foundFriend.setIsDeleted(true);

        friendRepository.save(foundFriend);
    }
}
