package com.uni.online_communications.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.models.ChannelMember;
import com.uni.online_communications.models.User;
import com.uni.online_communications.services.ChannelMemberService;
import com.uni.online_communications.services.ChannelService;
import com.uni.online_communications.services.UserService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/channel")
public class ChannelsController {

    private final ChannelService channelService;

    private final ChannelMemberService channelMemberService;

    private final UserService userService;

    public ChannelsController(ChannelService channelService, ChannelMemberService channelMemberService,
            UserService userService) {
        this.channelService = channelService;
        this.channelMemberService = channelMemberService;
        this.userService = userService;
    }

    class AccessibleChannelsResponse {
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
                .filter(channelMember -> channelMember.getUser().equals(userId))
                .collect(Collectors.toList());

        List<AccessibleChannelsResponse> accessibleChannels = channels.stream()
                .filter(channel -> matchedChannels.stream()
                        .anyMatch(channelMember -> channelMember.getChannel().equals(channel.getId())))
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

    class Member {
        Long userId;
        String username;
    }

    class ChannelMembersResponse {
        Long channelId;
        Member user;
        Member addedBy;
        Timestamp joinedAt;
        Boolean isDeleted;
    }

    @GetMapping("/{channelId}/members")
    public List<ChannelMembersResponse> getAllChannelMembers(@PathParam("channelId") Long channelId) {
        List<ChannelMember> channelMembers = channelMemberService.getAllMembersPerChannel(channelId);

        List<ChannelMembersResponse> response = channelMembers.stream().map(channelMember -> {
            ChannelMembersResponse member = new ChannelMembersResponse();

            member.channelId = channelMember.getChannel().getId();
            member.user.userId = channelMember.getUser().getId();
            ;

            User user = userService.getUserById(channelMember.getUser().getId());
            member.user.username = user.getUsername();
            member.user.userId = user.getId();

            User addedByUser = userService.getUserById(channelMember.getUser().getId());
            member.addedBy.userId = addedByUser.getId();
            member.addedBy.username = addedByUser.getUsername();

            member.joinedAt = Timestamp.valueOf(channelMember.getJoinedAt());
            member.isDeleted = channelMember.getIsDeleted();
            return member;
        }).collect(Collectors.toList());

        return response;
    }

    class ChannelCreateRequest {
        String name;
        Long ownerId;
    }

    @PostMapping("/create")
    public void createChannel(@RequestBody ChannelCreateRequest body) {
        Channel channel = new Channel();

        channel.setName(body.name);
        channel.setOwnerId(body.ownerId);

        channelService.createChannel(channel);
    }

    @PutMapping("/{channelId}/edit")
    public void editChannelName(@PathParam("channelId") Long channelId, @RequestBody String name) {
        Channel channel = channelService.getChannelById(channelId);

        channel.setName(name);

        channelService.updateChannel(channel);
    }

    @PutMapping("/{channelId}/edit/members")
    public void editChannelMembers(@PathParam("channelId") Long channelId, @RequestBody List<Long> userIds) {

        Channel channel = channelService.getChannelById(channelId);
        List<User> users = userIds.stream().map(userId -> userService.getUserById(userId)).collect(Collectors.toList());

        channelMemberService.changeMembersInChannel(channel, users);
    }

    @PutMapping("/{channelId}/delete")
    public void deleteChannel(@PathParam("channelId") Long channelId) {
        channelService.softDeleteChannel(channelId);
    }

}
