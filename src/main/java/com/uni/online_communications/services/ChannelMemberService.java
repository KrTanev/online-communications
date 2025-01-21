package com.uni.online_communications.services;

import java.util.List;

import com.uni.online_communications.models.ChannelMember;
import com.uni.online_communications.repository.ChannelMemberRepository;

public class ChannelMemberService {
    private final ChannelMemberRepository channelMemberRepository;

    public ChannelMemberService(ChannelMemberRepository channelMemberRepository) {
        this.channelMemberRepository = channelMemberRepository;
    }

    public List<ChannelMember> getAllChannelMembers() {
        return channelMemberRepository.findAll();
    }
}
