import { useState } from 'react';

import { Box } from '@mui/material';

import { InnerContainer } from '../common/InnerContainer';
import { Channels } from './Channels/Channels';

export const MainPageContainer = () => {
  const [selectedChannel, setSelectedChannel] = useState(0);

  const handleChannelClick = (id: number) => {
    setSelectedChannel(id);
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
          <Channels selectedChannelId={selectedChannel} onChannelClick={handleChannelClick} />
        </InnerContainer>

        <InnerContainer title="Chat"></InnerContainer>
        <InnerContainer title="Friends" />
      </Box>
    </Box>
  );
};
