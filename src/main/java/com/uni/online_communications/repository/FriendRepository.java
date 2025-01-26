package com.uni.online_communications.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uni.online_communications.models.Friend;
import com.uni.online_communications.models.User;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByFriendOneOrFriendTwo(User friendOne, User friendTwo);
}
