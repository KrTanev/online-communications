package com.uni.online_communications.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.dto.request.ChannelCreateRequest;
import com.uni.online_communications.dto.request.EditChannelMembersRequest;
import com.uni.online_communications.dto.request.EditChannelNameRequest;
import com.uni.online_communications.dto.response.AccessibleChannelsResponse;
import com.uni.online_communications.dto.response.ChannelMembersResponse;
import com.uni.online_communications.dto.response.MemberResponse;
import com.uni.online_communications.models.Channel;
import com.uni.online_communications.models.ChannelMember;
import com.uni.online_communications.models.User;
import com.uni.online_communications.services.ChannelMemberService;
import com.uni.online_communications.services.ChannelService;
import com.uni.online_communications.services.UserService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
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

    @GetMapping("/user/{userId}")
    public List<AccessibleChannelsResponse> getAccessibleChannels(@PathVariable("userId") Long userId) {
        List<ChannelMember> userChannelMembers = channelMemberService.getAllChannelsPerMember(userId);

        List<Channel> userChannels = channelService.getChannelsByIds(
                userChannelMembers.stream()
                        .map(channelMember -> channelMember.getChannel().getId())
                        .collect(Collectors.toList()));

        return userChannels.stream()
                .map(channel -> {
                    AccessibleChannelsResponse response = new AccessibleChannelsResponse();
                    response.setChannelId(channel.getId());
                    response.setChannelName(channel.getName());
                    response.setCreatedAt(channel.getCreatedAt());
                    response.setOwnerId(channel.getOwnerId());

                    response.setMemberIds(userChannelMembers.stream()
                            .filter(channelMember -> channelMember.getChannel().equals(channel))
                            .map(channelMember -> channelMember.getUser().getId())
                            .collect(Collectors.toList()));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/{channelId}/members")
    public List<ChannelMembersResponse> getAllChannelMembers(@PathVariable("channelId") Long channelId) {
        List<ChannelMember> channelMembers = channelMemberService.getAllMembersPerChannel(channelId);

        List<ChannelMembersResponse> response = channelMembers.stream().map(channelMember -> {
            Long userId = channelMember.getUser().getId();
            User user = userService.getUserById(userId);
            MemberResponse memberUser = new MemberResponse(userId, user.getUsername());

            Long addedByUserId = channelMember.getAddedBy().getId();
            User addedByUser = userService.getUserById(addedByUserId);
            MemberResponse addedByMember = new MemberResponse(addedByUserId, addedByUser.getUsername());

            return new ChannelMembersResponse(
                    channelMember.getChannel().getId(),
                    memberUser,
                    addedByMember,
                    Timestamp.valueOf(channelMember.getJoinedAt()),
                    channelMember.getIsDeleted());
        }).collect(Collectors.toList());

        return response;
    }

    @PostMapping("/create")
    public void createChannel(@RequestBody ChannelCreateRequest body) {
        Channel channel = new Channel();

        channel.setName(body.getName());
        channel.setOwnerId(body.getOwnerId());

        channelService.createChannel(channel);
    }

    @PutMapping("/{channelId}/edit")
    public void editChannelName(@PathVariable("channelId") Long channelId, @RequestBody EditChannelNameRequest body) {
        Channel channel = channelService.getChannelById(channelId);

        channel.setName(body.getName());

        channelService.updateChannel(channel);
    }

    @PutMapping("/{channelId}/edit/members")
    public void editChannelMembers(@PathVariable("channelId") Long channelId,
            @RequestBody EditChannelMembersRequest body) {
        Channel channel = channelService.getChannelById(channelId);
        List<User> users = body.getUserIds().stream()
                .map(userId -> userService.getUserById(userId))
                .collect(Collectors.toList());

        channelMemberService.changeMembersInChannel(channel, users, userService.getUserById(channel.getOwnerId()));
    }

    @PutMapping("/{channelId}/delete")
    public void deleteChannel(@PathVariable("channelId") Long channelId) {
        channelService.softDeleteChannel(channelId);
    }

}
