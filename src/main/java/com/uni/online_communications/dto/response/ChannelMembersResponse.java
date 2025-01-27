package com.uni.online_communications.dto.response;

import java.sql.Timestamp;

public class ChannelMembersResponse {
    private Long channelId;
    private MemberResponse user;
    private MemberResponse addedBy;
    private Timestamp joinedAt;
    private Boolean isDeleted;

    public ChannelMembersResponse(Long channelId, MemberResponse user, MemberResponse addedBy, Timestamp joinedAt,
            Boolean isDeleted) {
        this.channelId = channelId;
        this.user = user;
        this.addedBy = addedBy;
        this.joinedAt = joinedAt;
        this.isDeleted = isDeleted;
    }

    public Long getChannelId() {
        return channelId;
    }

    public void setChannelId(Long channelId) {
        this.channelId = channelId;
    }

    public MemberResponse getUser() {
        return user;
    }

    public void setUser(MemberResponse user) {
        this.user = user;
    }

    public MemberResponse getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(MemberResponse addedBy) {
        this.addedBy = addedBy;
    }

    public Timestamp getJoinedAt() {
        return joinedAt;
    }

    public void setJoinedAt(Timestamp joinedAt) {
        this.joinedAt = joinedAt;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}