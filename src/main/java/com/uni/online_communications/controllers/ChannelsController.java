package com.uni.online_communications.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.models.ChannelMember;
import com.uni.online_communications.services.ChannelMemberService;
import com.uni.online_communications.services.ChannelService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/channel")
public class ChannelsController {

    private final ChannelService channelService;

    private final ChannelMemberService channelMemberService;

    public ChannelsController(ChannelService channelService, ChannelMemberService channelMemberService) {
        this.channelService = channelService;
        this.channelMemberService = channelMemberService;
    }

    public class AccessibleChannelsResponse {
        Long channelId;
        String channelName;
        Timestamp createdAt;
        Long ownerId;
        List<Long> memberIds;
    }

    @GetMapping("/user/{userId}")
    public List<AccessibleChannelsResponse> getAccessibleChannels(@PathParam("userId") Long userId) {
        List<Channel> channels = channelService.getAllChannels();
        List<ChannelMember> channelMembers = channelMemberService.getAllChannelMembers();

        List<ChannelMember> matchedChannels = channelMembers.stream()
                .filter(channelMember -> channelMember.getUser().getId().equals(userId))
                .collect(Collectors.toList());

        List<AccessibleChannelsResponse> accessibleChannels = channels.stream()
                .filter(channel -> matchedChannels.stream()
                        .anyMatch(channelMember -> channelMember.getChannel().getId().equals(channel.getId())))
                .map(channel -> {
                    AccessibleChannelsResponse response = new AccessibleChannelsResponse();
                    response.channelId = channel.getId();
                    response.channelName = channel.getName();
                    response.createdAt = channel.getCreatedAt();
                    response.ownerId = channel.getOwnerId();
                    response.memberIds = channelMembers.stream()
                            .map(channelMember -> channelMember.getUser().getId()).collect(Collectors.toList());
                    return response;
                })
                .collect(Collectors.toList());

        return accessibleChannels;

    }
}
