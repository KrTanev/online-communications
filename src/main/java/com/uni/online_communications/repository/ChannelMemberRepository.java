package com.uni.online_communications.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.uni.online_communications.models.ChannelMember;

@Service
public interface ChannelMemberRepository extends JpaRepository<ChannelMember, Long> {

}
