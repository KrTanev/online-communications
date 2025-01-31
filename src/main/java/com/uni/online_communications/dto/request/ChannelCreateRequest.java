package com.uni.online_communications.dto.request;

import java.util.List;

public class ChannelCreateRequest {
    String name;
    Long ownerId;
    List<Long> memberIds;

    public String getName() {
        return name;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public List<Long> getMemberIds() {
        return memberIds;
    }

}