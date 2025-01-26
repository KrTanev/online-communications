package com.uni.online_communications.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.models.ChannelMember;
import com.uni.online_communications.models.User;
import com.uni.online_communications.repository.ChannelMemberRepository;

@Service
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

    public void changeMembersInChannel(Channel channel, List<User> userIds) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelId(channel.getId());

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channel.getId());
        }

        List<User> existingMembers = channelMembers.stream()
                .map(ChannelMember::getUser)
                .toList();

        List<User> membersToAdd = userIds.stream()
                .filter(userId -> !existingMembers.contains(userId))
                .toList();

        List<User> membersToRemove = existingMembers.stream()
                .filter(userId -> !userIds.contains(userId))
                .toList();

        addMembersToChannel(channel, membersToAdd);
        removeMembersForChannel(channel, membersToRemove.stream()
                .map(User::getId)
                .toList());
    }

    private void addMembersToChannel(Channel channelId, List<User> users) {
        users.forEach(user -> {
            ChannelMember channelMember = new ChannelMember();
            channelMember.setChannel(channelId);
            channelMember.setUser(user);
            channelMember.setRole("MEMBER");
            channelMember.setAddedBy(user);
            channelMember.setJoinedAt(LocalDateTime.now());
            channelMember.setIsDeleted(false);

            channelMemberRepository.save(channelMember);
        });
    }

    private void removeMembersForChannel(Channel channel, List<Long> userIds) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelId(channel.getId());

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channel.getId());
        }

        channelMembers.stream()
                .filter(channelMember -> userIds.contains(channelMember.getUser().getId()))
                .forEach(channelMember -> {
                    channelMember.setIsDeleted(true);
                    channelMemberRepository.save(channelMember);
                });
    }
}
