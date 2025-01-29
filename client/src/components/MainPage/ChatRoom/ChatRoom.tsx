import React, { useState } from 'react';

import { Box, Button, TextField, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';

import { DATE_FORMATS, EMPTY_STRING } from '@/utils/constants';

import {
  useAddMessageInChannel,
  useGetAllMessagesForChannel,
} from '../../../api/controllers/messageController';
import { ChatRoomMessagesRequest } from '../../../api/types/chatRooms';
import { User } from '../../../api/types/generic';
import { MessageBox } from './MessageBox';

const ChatContainer = styled(Box)({
  width: '100%%',
  margin: 'auto',
  minHeight: '60vh',
  display: 'flex',
  flexDirection: 'column',
});

type ChatRoomViewProps = {
  roomName: string;
  selectedRoomId: number;
};

export const ChatRoomView = ({ roomName, selectedRoomId }: ChatRoomViewProps) => {
  const userInfo = {
    id: 33,
    username: 'Test125',
    password: '1234',
    email: 'test@abv.bgg5',
    createdAt: '2025-01-27T17:45:34.664+00:00',
    isDeleted: false,
  } as User;
  //TODO: Get user

  const postChatMessage = useAddMessageInChannel();
  const [newMessage, setNewMessage] = useState(EMPTY_STRING);

  const { data: chatRoomMessages } = useGetAllMessagesForChannel(selectedRoomId, {
    enabled: Boolean(selectedRoomId),
  });

  chatRoomMessages?.sort((a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix());

  const handleSendMessage = () => {
    const messageReqData = {
      message: newMessage,
      channelId: selectedRoomId,
      senderId: userInfo?.id || 0,
    };

    postChatMessage.mutate(messageReqData);
    setNewMessage('');
  };

  return (
    <ChatContainer sx={{ mx: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {roomName}
      </Typography>

      {chatRoomMessages?.length === 0 && (
        <Box display="flex" justifyContent="center">
          No message
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {chatRoomMessages?.map((msg) => (
          <MessageBox key={msg.id} elevation={3} isCurrentUser={msg.sender.id === userInfo?.id}>
            <Box>
              <Typography variant="subtitle2" color="primary">
                {msg.sender.username || 'No name'}
              </Typography>
              <Typography>{msg.message}</Typography>
            </Box>
            <Box
              flexDirection="column"
              display="flex"
              gap="2px"
              justifyContent="flex-end"
              alignContent="flex-end"
            >
              <Typography variant="caption">
                {dayjs(msg.createdAt).format(DATE_FORMATS.DATE_SHORT_MONTH_YEAR)}
              </Typography>

              <Typography variant="caption" align="right">
                {dayjs(msg.createdAt).format('HH:MM')}
              </Typography>
            </Box>
          </MessageBox>
        ))}
      </Box>

      <Box display="flex" mt={2} gap={2}>
        <TextField
          variant="outlined"
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message"
        />

        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </ChatContainer>
  );
};
