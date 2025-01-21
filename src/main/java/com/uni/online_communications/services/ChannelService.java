package com.uni.online_communications.services;

import java.util.List;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.repository.ChannelRepository;

public class ChannelService {
    private final ChannelRepository channelRepository;

    public ChannelService(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    public List<Channel> getAllChannels() {
        return channelRepository.findAll();
    }
}
