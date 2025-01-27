package com.uni.online_communications.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.uni.online_communications.models.ChannelMember;

@Service
public interface ChannelMemberRepository extends JpaRepository<ChannelMember, Long> {
    <Optional> List<ChannelMember> findAllByChannelId(Long channelId);

    <Optional> List<ChannelMember> findAllByUserId(Long userId);
}
