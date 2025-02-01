import { useState } from 'react';

import { Box } from '@mui/material';

import { InnerContainer } from '../common/InnerContainer';
import { Channels } from './Channels/Channels';
import { ChatRoomView } from './ChatRoom/ChatRoom';
import { EmptyChat } from './ChatRoom/EmptyChat';
import { Friends } from './Friends/Friends';

export type SelectedItem = {
  itemId: number;
  type: 'channel' | 'friend';
  chatName: string;
};

export const MainPageContainer = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();

  const handleChannelClick = (id: number, channelName: string) => {
    setSelectedItem({ itemId: id, type: 'channel', chatName: channelName });
  };

  const handleFriendClick = (id: number, friendName: string) => {
    setSelectedItem({ itemId: id, type: 'friend', chatName: friendName });
  };

  console.log('selectedItem', selectedItem);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 5,
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '3fr 6fr 3fr',
          gap: 2,
        }}
      >
        <InnerContainer title="Channels">
          <Channels
            selectedChannelId={selectedItem?.type === 'channel' ? selectedItem?.itemId : undefined}
            onChannelClick={handleChannelClick}
          />
        </InnerContainer>

        <InnerContainer title="Chat">
          {selectedItem === undefined ? (
            <EmptyChat />
          ) : (
            <ChatRoomView
              roomName={selectedItem.chatName}
              selectedItemId={selectedItem.itemId}
              type={selectedItem.type}
            />
          )}
        </InnerContainer>

        <InnerContainer title="Friends">
          <Friends
            selectedFriendId={selectedItem?.type === 'friend' ? selectedItem.itemId : undefined}
            onFriendClick={handleFriendClick}
          />
        </InnerContainer>
      </Box>
    </Box>
  );
};
