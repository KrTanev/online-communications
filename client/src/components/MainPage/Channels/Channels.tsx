import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Divider, List, Typography } from '@mui/material';

import {
  useCreateChannel,
  useDeleteChannel,
  useEditChannel,
  useGetAccessibleChannels,
} from '../../../api/controllers/channelsController';
import { AccessibleChannelsResponse } from '../../../api/types/channels';
import { useAuthorization } from '../../../providers/AuthorizationProvider';
import { CustomDialog } from '../../common/CustomDialog';
import { IconWrapper } from '../../common/IconWrapper';
import { ChannelForm, ChannelFormData } from './ChannelForm';
import { ChannelListItem } from './ChannelListItem';

type ChannelsProps = {
  selectedChannelId?: number;
  onChannelClick: (id: number, name: string) => void;
};

export const Channels = ({ selectedChannelId, onChannelClick }: ChannelsProps) => {
  const { authUser } = useAuthorization();
  const authUserId = authUser?.id || -1;

  const [selectedChannel, setSelectedChannel] = useState<AccessibleChannelsResponse>();
  const [channelForm, setChannelFormData] = useState<ChannelFormData>();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const { data } = useGetAccessibleChannels(authUserId);

  const createChannel = useCreateChannel();
  const editChannel = useEditChannel();
  const deleteChanel = useDeleteChannel();

  const handleCloseDialogs = () => {
    setShowEditDialog(false);
    setShowDeleteDialog(false);
    setShowAddDialog(false);
  };

  const handleSubmitCreate = () => {
    createChannel
      .mutateAsync({
        name: channelForm?.channelName || '',
        ownerId: Number(authUserId),
        memberIds: channelForm?.channelMembers || [],
      })
      .then(handleCloseDialogs);
  };

  const handleSubmitEdit = () => {
    editChannel
      .mutateAsync({
        channelId: selectedChannel?.channelId || 0,
        body: {
          name: channelForm?.channelName || '',
          memberIds: channelForm?.channelMembers || [],
        },
      })
      .then(handleCloseDialogs);
  };

  const handleSubmitDelete = () => {
    deleteChanel.mutateAsync(selectedChannel?.channelId || 0).then(handleCloseDialogs);
  };

  const handleEditClick = (data: AccessibleChannelsResponse) => {
    setSelectedChannel(data);
    setShowEditDialog(true);
  };

  const handleDeleteClick = (data: AccessibleChannelsResponse) => {
    setSelectedChannel(data);
    setShowDeleteDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography>Available channels</Typography>

        <IconWrapper onClick={() => setShowAddDialog(true)} tooltipTitle="Create channel">
          <AddIcon />
        </IconWrapper>
      </Box>
      <Divider />

      <List sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
        {data?.map((x, i) => (
          <ChannelListItem
            key={`${i}-${x.id}`}
            item={x}
            onClick={(item) => onChannelClick(item.channelId, item.channelName)}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            selected={x.channelId === selectedChannelId}
          />
        ))}
      </List>

      {showAddDialog && (
        <CustomDialog
          open={showAddDialog}
          onClose={handleCloseDialogs}
          title={'Add channel'}
          children={<ChannelForm onChange={(data) => setChannelFormData(data)} />}
          actions={
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDialogs}>
                Close
              </Button>
              <Button variant="contained" onClick={handleSubmitCreate}>
                Add channel
              </Button>
            </Box>
          }
        />
      )}

      {showEditDialog && (
        <CustomDialog
          open={showEditDialog}
          onClose={handleCloseDialogs}
          title={'Edit channel'}
          children={
            <ChannelForm
              channelMembers={selectedChannel?.memberIds}
              channelName={selectedChannel?.channelName}
              onChange={(data) => setChannelFormData(data)}
            />
          }
          actions={
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDialogs}>
                Close
              </Button>
              <Button variant="contained" onClick={handleSubmitEdit}>
                Edit channel
              </Button>
            </Box>
          }
        />
      )}

      {showDeleteDialog && (
        <CustomDialog
          open={showDeleteDialog}
          onClose={handleCloseDialogs}
          title={'Delete channel'}
          children={<Typography>Are you sure that you wan to delete this channel?</Typography>}
          actions={
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseDialogs}>
                Close
              </Button>
              <Button variant="contained" onClick={handleSubmitDelete}>
                Delete channel
              </Button>
            </Box>
          }
        />
      )}
    </Box>
  );
};
