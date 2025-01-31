import { useState } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button, Divider, List, Typography } from '@mui/material';

import {
  useAddFriend,
  useDeleteFriend,
  useGetAllFriendsForUser,
} from '../../../api/controllers/friendsController';
import { FriendsResponse } from '../../../api/types/friends';
import { useAuthorization } from '../../../providers/AuthorizationProvider';
import { CustomDialog } from '../../common/CustomDialog';
import { IconWrapper } from '../../common/IconWrapper';
import { FriendForm } from './FriendForm';
import { FriendListItem } from './FriendListItem';

type FriendsProps = {
  selectedFriendId?: number;
  onFriendClick: (id: number, name: string) => void;
};

export const Friends = ({ selectedFriendId, onFriendClick }: FriendsProps) => {
  const { authUser } = useAuthorization();
  const authUserId = authUser?.id || -1;

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<FriendsResponse | null>(null);
  const [friendId, setFriendId] = useState<number>();

  const { data: friends } = useGetAllFriendsForUser(authUserId);
  const addFriend = useAddFriend();
  const deleteFriend = useDeleteFriend();

  const handleCloseDialogs = () => {
    setShowAddDialog(false);
    setShowDeleteDialog(false);
    setSelectedFriend(null);
    setFriendId(undefined);
  };

  const handleSubmitAdd = () => {
    addFriend.mutate(
      { userId: authUserId, friendId: friendId || 0 },
      {
        onSuccess: () => {
          handleCloseDialogs();
        },
      },
    );
  };

  const handleSubmitDelete = () => {
    if (selectedFriend && selectedFriend?.friendId) {
      deleteFriend.mutate(
        { userId: authUserId, friendId: selectedFriend.friendId },
        {
          onSuccess: () => {
            handleCloseDialogs();
          },
        },
      );
    }
  };

  const handleDeleteClick = (friend: FriendsResponse) => {
    setSelectedFriend(friend);
    setShowDeleteDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Available Friends</Typography>
        <IconWrapper onClick={() => setShowAddDialog(true)} tooltipTitle="Add friend">
          <PersonAddIcon />
        </IconWrapper>
      </Box>
      <Divider />

      <List sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        {friends?.map((friend, i) => (
          <FriendListItem
            key={i}
            item={friend}
            onClick={() => onFriendClick(friend.friendId, friend.friendName)}
            onDeleteClick={() => handleDeleteClick(friend)}
            selected={friend.friendId === selectedFriendId}
          />
        ))}
      </List>

      {showAddDialog && (
        <CustomDialog
          open={showAddDialog}
          onClose={handleCloseDialogs}
          title="Add Friend"
          children={
            <FriendForm onChange={(newFriendId) => setFriendId(Number(newFriendId.friendId))} />
          }
          actions={
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDialogs}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmitAdd}>
                Add Friend
              </Button>
            </Box>
          }
        />
      )}

      {showDeleteDialog && (
        <CustomDialog
          open={showDeleteDialog}
          onClose={handleCloseDialogs}
          title="Delete Friend"
          children={<Typography>Are you sure you want to delete this friend?</Typography>}
          actions={
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDialogs}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmitDelete}>
                Delete Friend
              </Button>
            </Box>
          }
        />
      )}
    </Box>
  );
};
