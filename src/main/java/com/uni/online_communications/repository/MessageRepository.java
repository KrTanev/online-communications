package com.uni.online_communications.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uni.online_communications.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findAllByRecipientChannelId(Long channelId);

    Optional<List<Message>> findAllByRecipientUserAndSenderId(Long recipientId, Long senderId);
}
