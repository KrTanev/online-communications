package com.uni.online_communications.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uni.online_communications.models.Channel;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {

}
