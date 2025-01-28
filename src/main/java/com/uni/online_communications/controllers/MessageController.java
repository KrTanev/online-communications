package com.uni.online_communications.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.dto.request.MessageChannelRequest;
import com.uni.online_communications.dto.request.MessageFriendsRequest;
import com.uni.online_communications.models.Message;
import com.uni.online_communications.services.ChannelService;
import com.uni.online_communications.services.MessageService;
import com.uni.online_communications.services.UserService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/message")
public class MessageController {
    private final MessageService messageService;

    private final ChannelService channelService;

    private final UserService userService;

    public MessageController(MessageService messageService, ChannelService channelService, UserService userService) {
        this.messageService = messageService;
        this.channelService = channelService;
        this.userService = userService;
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<List<Message>> getAllMessagesForChannel(@PathVariable Long channelId) {
        List<Message> messages = messageService.getAllMessagesForChannel(channelService.getChannelById(channelId));

        return ResponseEntity.ok(messages);
    }

    @GetMapping("/user/{recipientId}/{senderId}")
    public ResponseEntity<List<Message>> getAllMessagesBetweenUsers(@PathVariable Long recipientId,
            @PathVariable Long senderId) {
        List<Message> messages = messageService.getAllMessagesBetweenUsers(userService.getUserById(recipientId),
                userService.getUserById(senderId));

        return ResponseEntity.ok(messages);
    }

    @PostMapping("/users/create")
    public ResponseEntity<Void> addMessageBetweenUsers(@RequestBody MessageFriendsRequest body) {

        Message newMessage = new Message();

        newMessage.setRecipientUser(userService.getUserById(body.getRecipientId()));
        newMessage.setSender(userService.getUserById(body.getSenderId()));
        newMessage.setMessage(body.getMessage());

        messageService.createNewMessage(newMessage);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/delete/{messageId}")
    public ResponseEntity<Void> softDeleteMessage(@PathVariable Long messageId) {
        messageService.softDeleteMessage(messageId);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/channel/create")
    public ResponseEntity<Void> addMessageInChannel(@RequestBody MessageChannelRequest body) {

        Message newMessage = new Message();

        newMessage.setRecipientChannel(channelService.getChannelById(body.getChannelId()));
        newMessage.setSender(userService.getUserById(body.getSenderId()));
        newMessage.setMessage(body.getMessage());

        messageService.createNewMessage(newMessage);

        return ResponseEntity.ok().build();
    }

}
