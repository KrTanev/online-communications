package com.uni.online_communications.dto.request;

public class ChannelCreateRequest {
    String name;
    Long ownerId;

    public String getName() {
        return name;
    }

    public Long getOwnerId() {
        return ownerId;
    }
}