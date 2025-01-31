package com.uni.online_communications.dto.response;

import java.sql.Timestamp;
import java.util.List;

public class AccessibleChannelsResponse {
    public Long channelId;
    String channelName;
    Timestamp createdAt;
    Long ownerId;
    List<Long> memberIds;

    public AccessibleChannelsResponse() {
    }

    public AccessibleChannelsResponse(Long channelId, String channelName, Timestamp createdAt, Long ownerId,
            List<Long> memberIds) {
        this.channelId = channelId;
        this.channelName = channelName;
        this.createdAt = createdAt;
        this.ownerId = ownerId;
        this.memberIds = memberIds;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public String getChannelName() {
        return channelName;
    }

    public void setChannelName(String channelName) {
        this.channelName = channelName;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public List<Long> getMemberIds() {
        return memberIds;
    }

    public void setMemberIds(List<Long> memberIds) {
        this.memberIds = memberIds;
    }
}
