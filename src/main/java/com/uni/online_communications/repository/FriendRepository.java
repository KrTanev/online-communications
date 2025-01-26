package com.uni.online_communications.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uni.online_communications.models.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByUser1IdOrUser2Id(Long user1Id, Long user2Id);
}
