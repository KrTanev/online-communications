package com.uni.online_communications.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.uni.online_communications.models.Friend;
import com.uni.online_communications.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
    boolean existsByFriendOneAndFriendTwoAndIsDeletedFalse(User friendOne, User friendTwo);

    Friend findByFriendOneAndFriendTwoAndIsDeletedFalse(User friendOne, User friendTwo);

    Friend findByFriendOneAndFriendTwoAndIsDeletedTrue(User friendOne, User friendTwo);

    List<Friend> findByFriendOneOrFriendTwoAndIsDeletedFalse(User friendOne, User friendTwo);
}
