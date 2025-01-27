package com.uni.online_communications.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uni.online_communications.models.ChannelMember;

@Repository
public interface ChannelMemberRepository extends JpaRepository<ChannelMember, Long> {
    List<ChannelMember> findAllByChannelIdAndIsDeletedFalse(Long channelId);

    List<ChannelMember> findAllByUserIdAndIsDeletedFalse(Long userId);
}