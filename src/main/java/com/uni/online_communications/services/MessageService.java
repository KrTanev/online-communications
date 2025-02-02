package com.uni.online_communications.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.models.Message;
import com.uni.online_communications.models.User;
import com.uni.online_communications.repository.MessageRepository;

@Service
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getAllMessagesForChannel(Channel channel) {
        return messageRepository.findAllByRecipientChannelAndIsDeletedFalse(channel)
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                "No messages found for channel with id: " + channel.getId()));
    }

    public List<Message> getAllMessagesBetweenUsers(User recipient, User sender) {
        List<Message> messagesFromSender = messageRepository
                .findAllBySenderAndRecipientUserAndIsDeletedFalse(recipient, sender)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No messages found between users with ids: " + recipient.getId() + " and " + sender.getId()));

        List<Message> messagesFromRecipient = messageRepository
                .findAllByRecipientUserAndSenderAndIsDeletedFalse(recipient, sender)
                .orElseThrow(() -> new IllegalArgumentException(
                        "No messages found between users with ids: " + recipient.getId() + " and " + sender.getId()));

        messagesFromSender.addAll(messagesFromRecipient);

        return messagesFromSender;
    }

    public Message createNewMessage(Message message) {
        return messageRepository.save(message);
    }

    public void softDeleteMessage(Long messageId) {
        Message messageToDelete = (Message) messageRepository.getByIdAndIsDeletedFalse(messageId)
                .orElseThrow(() -> new IllegalArgumentException("No message found with id: " + messageId));

        messageToDelete.setIsDeleted(true);
        messageRepository.save(messageToDelete);
    }

}
