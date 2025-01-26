package com.uni.online_communications.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.models.Message;
import com.uni.online_communications.repository.MessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getAllMessagesForChannel(Long channelId) {
        return messageRepository.findAllByRecipientChannelId(channelId)
                .orElseThrow(() -> new IllegalArgumentException("No messages found for channel with id: " + channelId));
    }

    public List<Message> getAllMessagesBetweenUsers(Long recipientId, Long senderId) {
        return messageRepository.findAllByRecipientUserAndSenderId(recipientId, senderId)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No messages found between users with ids: " + recipientId + " and " + senderId));
    }

    public Message createNewMessage(Message message) {
        return messageRepository.save(message);
    }

    public void softDeleteMessage(Long messageId) {
        Message messageToDelete = (Message) messageRepository.getByIdAndIsDeleted(messageId, false)
                .orElseThrow(() -> new IllegalArgumentException("No message found with id: " + messageId));

        messageToDelete.setIsDeleted(true);
        messageRepository.save(messageToDelete);
    }

}
