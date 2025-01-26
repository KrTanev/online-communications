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

    public List<ChannelMember> getAllMembersPerChannel(Long channelId) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelId(channelId);

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channelId);
        }

        return channelMembers;
    }

    public void changeMembersInChannel(Long channelId, List<Long> userIds) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelId(channelId);

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channelId);
        }

        List<Long> existingMembers = channelMembers.stream()
                .map(ChannelMember::getUser)
                .toList();

        List<Long> membersToAdd = userIds.stream()
                .filter(userId -> !existingMembers.contains(userId))
                .toList();

        List<Long> membersToRemove = existingMembers.stream()
                .filter(userId -> !userIds.contains(userId))
                .toList();

        addMembersToChannel(channelId, membersToAdd);
        removeMembersForChannel(channelId, membersToRemove);
    }

    private void addMembersToChannel(Long channelId, List<Long> userIds) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelId(channelId);

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channelId);
        }

        userIds.stream()
                .filter(userId -> channelMembers.stream()
                        .noneMatch(channelMember -> channelMember.getUser().equals(userId)))
                .forEach(userId -> {
                    ChannelMember channelMember = new ChannelMember();
                    channelMember.setChannel(channelId);
                    channelMember.setUser(userId);
                    channelMemberRepository.save(channelMember);
                });
    }

    private void removeMembersForChannel(Long channelId, List<Long> userIds) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelId(channelId);

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channelId);
        }

        channelMembers.stream()
                .filter(channelMember -> userIds.contains(channelMember.getUser()))
                .forEach(channelMember -> {
                    channelMember.setIsDeleted(true);
                    channelMemberRepository.save(channelMember);
                });
    }
}
