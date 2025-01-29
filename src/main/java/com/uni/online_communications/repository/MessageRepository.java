package com.uni.online_communications.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.models.Message;
import com.uni.online_communications.models.User;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Optional<List<Message>> findAllByRecipientChannelAndIsDeletedFalse(Channel channel);

    Optional<List<Message>> findAllByRecipientUserAndSenderAndIsDeletedFalse(User recipient, User sender);

    Optional<Message> getByIdAndIsDeletedFalse(Long messageId);
}
