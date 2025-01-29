package com.uni.online_communications.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.dto.request.ChannelCreateRequest;
import com.uni.online_communications.dto.request.EditChannelRequest;
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
    public ResponseEntity<List<AccessibleChannelsResponse>> getAccessibleChannels(@PathVariable("userId") Long userId) {
        List<ChannelMember> userChannelMembers = channelMemberService.getAllChannelsPerMember(userId);

        List<Channel> userChannels = channelService.getChannelsByIds(
                userChannelMembers.stream()
                        .map(channelMember -> channelMember.getChannel().getId())
                        .collect(Collectors.toList()));

        return ResponseEntity.ok().body(userChannels.stream()
                .map(channel -> {
                    AccessibleChannelsResponse response = new AccessibleChannelsResponse();
                    response.setChannelId(channel.getId());
                    response.setChannelName(channel.getName());
                    response.setCreatedAt(channel.getCreatedAt());
                    response.setOwnerId(channel.getOwnerId());

                    response.setMemberIds(channelMemberService.getAllMembersPerChannel(channel.getId()).stream()
                            .filter(channelMember -> channelMember.getChannel().getId().equals(channel.getId()))
                            .map(channelMember -> channelMember.getUser().getId())
                            .collect(Collectors.toList()));
                    return response;
                })
                .collect(Collectors.toList()));
    }

    @GetMapping("/{channelId}/members")
    public ResponseEntity<List<ChannelMembersResponse>> getAllChannelMembers(
            @PathVariable("channelId") Long channelId) {
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

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createChannel(@RequestBody ChannelCreateRequest body) {
        Channel channel = new Channel();

        channel.setName(body.getName());
        channel.setOwnerId(body.getOwnerId());

        channelService.createChannel(channel);

        List<User> users = body.getMemberIds().stream()
                .map(userService::getUserById)
                .collect(Collectors.toList());

        channelMemberService.changeMembersInChannel(channelService.getChannelById(channel.getId()), users,
                userService.getUserById(channel.getOwnerId()));

        return ResponseEntity.ok().body("Successfully created channel.");

    }

    @PutMapping("/{channelId}/edit")
    public ResponseEntity<String> editChannel(@PathVariable("channelId") Long channelId,
            @RequestBody EditChannelRequest body) {
        Channel channel = channelService.getChannelById(channelId);

        if (body.getName() != null) {
            channel.setName(body.getName());
            channelService.updateChannel(channel);
        }

        if (body.getMemberIds() != null && !body.getMemberIds().isEmpty()) {
            List<User> users = body.getMemberIds().stream()
                    .map(userService::getUserById)
                    .collect(Collectors.toList());

            channelMemberService.changeMembersInChannel(channel, users, userService.getUserById(channel.getOwnerId()));
        }

        return ResponseEntity.ok().body("Successfully edited channel.");

    }

    @PutMapping("/{channelId}/delete")
    public ResponseEntity<String> deleteChannel(@PathVariable("channelId") Long channelId) {
        channelService.softDeleteChannel(channelId);

        return ResponseEntity.ok().body("Successfully deleted channel.");
    }

}
