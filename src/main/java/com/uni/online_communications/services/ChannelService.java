package com.uni.online_communications.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.uni.online_communications.models.Channel;
import com.uni.online_communications.repository.ChannelRepository;

@Service
public class ChannelService {
    private final ChannelRepository channelRepository;

    public ChannelService(ChannelRepository channelRepository) {
        this.channelRepository = channelRepository;
    }

    public List<Channel> getAllChannels() {
        return channelRepository.findAll();
    }

    public Channel getChannelById(Long channelId) {
        return channelRepository.findById(channelId)
                .orElseThrow(() -> new IllegalArgumentException("Channel with id: " + channelId + " not found"));
    }

    public void createChannel(Channel channel) {
        List<Channel> channels = channelRepository.findAll();

        if (channels.stream().anyMatch(c -> c.getName().equals(channel.getName()))) {
            throw new IllegalArgumentException("Channel with name: " + channel.getName() + " already exists");
        }

        channelRepository.save(channel);
    }

    public void updateChannel(Channel channel) {
        Channel existingChannel = getChannelById(channel.getId());

        existingChannel.setName(channel.getName());
        existingChannel.setOwnerId(channel.getOwnerId());

        channelRepository.save(existingChannel);
    }

    public void softDeleteChannel(Long channelId) {
        Channel channel = getChannelById(channelId);

        channel.setIsDeleted(true);

        channelRepository.save(channel);
    }
}
