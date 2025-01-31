package com.uni.online_communications.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByChannelIdAndIsDeletedFalse(channelId);

        if (channelMembers.isEmpty()) {
            throw new IllegalArgumentException("No members found for channel with id: " + channelId);
        }

        return channelMembers;
    }

    public List<ChannelMember> getAllChannelsPerMember(Long userId) {
        List<ChannelMember> channelMembers = channelMemberRepository.findAllByUserIdAndIsDeletedFalse(userId);

        List<ChannelMember> ownedChannels = channelMemberRepository.findAllByAddedByIdAndIsDeletedFalse(userId);

        if (channelMembers.isEmpty() && ownedChannels.isEmpty()) {
            throw new IllegalArgumentException("No channels found for user with id: " + userId);
        }

        channelMembers.addAll(ownedChannels);

        return channelMembers;
    }

    @Transactional
    public void changeMembersInChannel(Channel channel, List<User> users, User addedBy) {
        List<ChannelMember> channelMembers = channelMemberRepository
                .findAllByChannelIdAndIsDeletedFalse(channel.getId());

        Set<Long> existingMemberIds = channelMembers.stream()
                .map(cm -> cm.getUser().getId())
                .collect(Collectors.toSet());

        Set<Long> newMemberIds = users.stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        List<User> membersToAdd = users.stream()
                .filter(user -> !existingMemberIds.contains(user.getId()))
                .toList();

        List<User> membersToRemove = channelMembers.stream()
                .map(ChannelMember::getUser)
                .filter(user -> !newMemberIds.contains(user.getId()))
                .toList();

        addMembersToChannel(channel, membersToAdd, addedBy);
        removeMembersForChannel(channel, membersToRemove.stream()
                .map(User::getId)
                .toList());
    }

    private void addMembersToChannel(Channel channel, List<User> users, User addedBy) {
        users.forEach(user -> {
            ChannelMember channelMember = new ChannelMember();
            channelMember.setChannel(channel);
            channelMember.setUser(user);
            channelMember.setRole("MEMBER");
            channelMember.setAddedBy(addedBy);
            channelMember.setJoinedAt(LocalDateTime.now());
            channelMember.setIsDeleted(false);

            channelMemberRepository.save(channelMember);
        });
    }

    private void removeMembersForChannel(Channel channel, List<Long> userIds) {
        channelMemberRepository.findAllByChannelIdAndIsDeletedFalse(channel.getId()).stream()
                .filter(channelMember -> userIds.contains(channelMember.getUser().getId()))
                .forEach(channelMember -> {
                    channelMember.setIsDeleted(true);
                    channelMemberRepository.save(channelMember);
                });
    }
}
