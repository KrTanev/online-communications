import { useState } from 'react';

import { Box } from '@mui/material';

import { InnerContainer } from '../common/InnerContainer';
import { Channels } from './Channels/Channels';
// import { ChatRoomView } from './ChatRoom/ChatRoom';
import { EmptyChat } from './ChatRoom/EmptyChat';
import { Friends } from './Friends/Friends';

export type SelectedItem = { itemId: string | number; type: 'channel' | 'friend' };

export const MainPageContainer = () => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>();

  const handleChannelClick = (id: number) => {
    setSelectedItem({ itemId: id, type: 'channel' });
  };

  const handleFriendClick = (id: number) => {
    setSelectedItem({ itemId: id, type: 'friend' });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        p: 5,
      }}
    >
      <Box marginBottom={3}>Uni project</Box>

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
            selectedChannelId={Number(selectedItem?.itemId)}
            onChannelClick={handleChannelClick}
          />
        </InnerContainer>

        <InnerContainer title="Chat">
          {selectedItem === undefined ? (
            <EmptyChat />
          ) : (
            <>{/* <ChatRoomView roomName={'Example'} selectedRoomId={String(selectedItem)} /> */}</>
          )}
        </InnerContainer>

        <InnerContainer title="Friends">
          <Friends
            selectedFriendId={selectedItem?.itemId as number}
            onFriendClick={handleFriendClick}
          />
        </InnerContainer>
      </Box>
    </Box>
  );
};
