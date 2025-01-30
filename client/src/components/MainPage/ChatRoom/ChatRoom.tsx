import React, { useEffect, useState } from 'react';

import { Box, Button, TextField, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';

import { DATE_FORMATS, EMPTY_STRING } from '@/utils/constants';

import {
  useAddMessageBetweenUsers,
  useAddMessageInChannel,
  useGetAllMessagesBetweenUsers,
  useGetAllMessagesForChannel,
  useSoftDeleteMessage,
} from '../../../api/controllers/messageController';
import { User } from '../../../api/types/generic';
import { Message } from '../../../api/types/message';
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
  type: 'channel' | 'friend';
  selectedItemId?: number;
};

export const ChatRoomView = ({ roomName, type, selectedItemId }: ChatRoomViewProps) => {
  const userInfo = {
    id: 33,
    username: 'Test125',
    password: '1234',
    email: 'test@abv.bgg5',
    createdAt: '2025-01-27T17:45:34.664+00:00',
    isDeleted: false,
  } as User;
  //TODO: Get user

  const isGroupChannel = type === 'channel';

  const { data: chatRoomMessages } = useGetAllMessagesForChannel(selectedItemId || 0, {
    enabled: Boolean(isGroupChannel && selectedItemId),
  });

  const { data: friendsMessages } = useGetAllMessagesBetweenUsers(
    userInfo.id || 0,
    selectedItemId || 0,
    {
      enabled: Boolean(!isGroupChannel && selectedItemId),
    },
  );

  const postChatMessage = useAddMessageInChannel();
  const postFriendsMessage = useAddMessageBetweenUsers();

  const deleteMessage = useSoftDeleteMessage();

  const [messages, setMessages] = useState<Message[]>();
  const [newMessage, setNewMessage] = useState(EMPTY_STRING);
  const [deleteSectionHovered, setIsDeleteSectionHovered] = useState(false);

  useEffect(() => {
    const messagesToPresent = (isGroupChannel ? chatRoomMessages : friendsMessages)?.sort(
      (a: any, b: any) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    );

    setMessages(structuredClone(messagesToPresent));
  }, [chatRoomMessages, friendsMessages, type, roomName]);

  const handleSendMessage = () => {
    const messageReqData = {
      message: newMessage,
      channelId: selectedItemId || 0,
      recipientId: selectedItemId || 0,
      senderId: userInfo?.id || 0,
    };

    if (selectedItemId && userInfo?.id) {
      if (isGroupChannel) {
        postChatMessage.mutate(messageReqData);
      } else {
        postFriendsMessage.mutate(messageReqData);
      }
    }

    setNewMessage('');
  };

  const filtered = messages?.filter((x) => x.sender.id === userInfo.id) || [];

  return (
    <ChatContainer sx={{ mx: 4 }}>
      <Typography variant="h6" align="center" gutterBottom>
        {roomName}
      </Typography>

      {messages?.length === 0 && (
        <Box display="flex" justifyContent="center">
          No message
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {messages?.map((msg) => (
          <MessageBox key={msg.id} elevation={3} isCurrentUser={msg.sender.id === userInfo?.id}>
            <Box>
              <Typography variant="subtitle2" color="primary">
                {msg.sender.username || 'No name'}
              </Typography>
              <Typography>{msg.message}</Typography>
            </Box>

            <Box
              onMouseEnter={() => {
                if (msg.sender.id === userInfo.id && filtered[filtered.length - 1].id === msg.id) {
                  setIsDeleteSectionHovered(true);
                }
              }}
              onMouseLeave={() => {
                if (msg.sender.id === userInfo.id && filtered[filtered.length - 1].id === msg.id) {
                  setIsDeleteSectionHovered(false);
                }
              }}
            >
              <Box display="flex" justifyContent="flex-end" alignContent="flex-end">
                {deleteSectionHovered && filtered[filtered.length - 1].id === msg.id ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', pt: '3px' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteMessage.mutate(msg.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                ) : (
                  <Box flexDirection="column" display="flex" gap="2px">
                    <Typography variant="caption">
                      {dayjs(msg.createdAt).format(DATE_FORMATS.DATE_SHORT_MONTH_YEAR)}
                    </Typography>

                    <Typography variant="caption" align="right">
                      {dayjs(msg.createdAt).format('HH:MM')}
                    </Typography>
                  </Box>
                )}
              </Box>
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
