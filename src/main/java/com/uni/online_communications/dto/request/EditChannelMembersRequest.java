package com.uni.online_communications.dto.request;

import java.util.List;

public class EditChannelMembersRequest {
    private List<Long> userIds;

    public List<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
    }
}