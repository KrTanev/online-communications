package com.uni.online_communications.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uni.online_communications.models.Message;
import com.uni.online_communications.services.MessageService;

@RestController
@RequestMapping("/api/message")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<List<Message>> getAllMessagesForChannel(@PathVariable Long channelId) {
        List<Message> messages = messageService.getAllMessagesForChannel(channelId);

        return ResponseEntity.ok(messages);
    }

    @GetMapping("/user/{recipientId}/{senderId}")
    public ResponseEntity<List<Message>> getAllMessagesBetweenUsers(@PathVariable Long recipientId,
            @PathVariable Long senderId) {
        List<Message> messages = messageService.getAllMessagesBetweenUsers(recipientId, senderId);

        return ResponseEntity.ok(messages);
    }

    @PutMapping("/delete/{messageId}")
    public ResponseEntity<Void> softDeleteMessage(@PathVariable Long messageId) {
        messageService.softDeleteMessage(messageId);

        return ResponseEntity.ok().build();
    }

    class UsersAddMessageBody {
        Long recipientId;
        Long senderId;
        String message;
    }

    @PostMapping("/users/create")
    public ResponseEntity<Void> addMessageBetweenUsers(@RequestBody UsersAddMessageBody body) {

        Message newMessage = new Message();

        newMessage.setRecipientUser(body.recipientId);
        newMessage.setSender(body.senderId);
        newMessage.setMessage(body.message);

        messageService.createNewMessage(newMessage);

        return ResponseEntity.ok().build();
    }

    class ChannelAddMessageBody {
        Long channelId;
        Long senderId;
        String message;
    }

    @PostMapping("/channel/create")
    public ResponseEntity<Void> addMessageInChannel(@RequestBody ChannelAddMessageBody body) {

        Message newMessage = new Message();

        newMessage.setRecipientChannel(body.channelId);
        newMessage.setSender(body.senderId);
        newMessage.setMessage(body.message);

        messageService.createNewMessage(newMessage);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/delete/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId) {
        messageService.softDeleteMessage(messageId);

        return ResponseEntity.ok().build();
    }
}
