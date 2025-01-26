package com.uni.online_communications.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.models.Friend;
import com.uni.online_communications.repository.FriendRepository;

@Service
public class FriendsService {
    private final FriendRepository userRepository;

    public FriendsService(FriendRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<Friend> getAllFriendsForUser(Long userId) {
        List<Friend> foundFriends = userRepository.findByUser1IdOrUser2Id(userId, userId);

        if (foundFriends.isEmpty()) {
            throw new IllegalArgumentException("No friends found for user with id: " + userId);
        }

        return foundFriends;
    }

    public void addFriend(Long userId, Long friendId) {
        if (userId.equals(friendId)) {
            throw new IllegalArgumentException("User cannot be friends with themselves");
        }

        List<Friend> foundFriends = userRepository.findByUser1IdOrUser2Id(userId, userId);

        for (Friend friend : foundFriends) {
            if (friend.getFriendOne().equals(friendId) || friend.getFriendTwo().equals(friendId)) {
                throw new IllegalArgumentException("Users are already friends");
            }
        }

        Friend friend = new Friend();

        friend.setFriendOne(userId);
        friend.setFriendTwo(friendId);

        userRepository.save(friend);
    }

    public void softDeleteFriend(Long userId, Long friendId) {
        List<Friend> foundFriends = userRepository.findByUser1IdOrUser2Id(userId, userId);

        Friend foundFriend = null;

        for (Friend friend : foundFriends) {
            if (friend.getFriendOne().equals(friendId) || friend.getFriendTwo().equals(friendId)) {
                foundFriend = friend;
                break;
            }
        }

        if (foundFriend == null || foundFriend.getIsDeleted() == true) {
            throw new IllegalArgumentException("Users are not friends");
        }

        foundFriend.setIsDeleted(true);

        userRepository.save(foundFriend);
    }
}
