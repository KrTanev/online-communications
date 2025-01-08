import { Box } from '@mui/material';

import { InnerContainer } from '../common/InnerContainer';
import { Channels } from './Channels';

export const MainPageContainer = () => {
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
          <Channels />
        </InnerContainer>

        <InnerContainer title="Chat" />
        <InnerContainer title="Friends" />
      </Box>
    </Box>
  );
};
