package com.uni.online_communications.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping("/create")
    public ResponseEntity<Message> createNewMessage(@RequestBody Message message) {
        Message newMessage = messageService.createNewMessage(message);

        return ResponseEntity.ok(newMessage);
    }
}
