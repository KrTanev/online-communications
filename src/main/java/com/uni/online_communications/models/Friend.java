package com.uni.online_communications.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "FRIENDS")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "friend_id_one", nullable = false)
    private User friendOne;

    @ManyToOne
    @JoinColumn(name = "friend_id_two", nullable = false)
    private User friendTwo;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getFriendOne() {
        return friendOne;
    }

    public void setFriendOne(User friendOne) {
        this.friendOne = friendOne;
    }

    public User getFriendTwo() {
        return friendTwo;
    }

    public void setFriendTwo(User friendTwo) {
        this.friendTwo = friendTwo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Boolean getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
