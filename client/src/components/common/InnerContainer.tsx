import { ReactNode } from 'react';

import { Box, Divider } from '@mui/material';

export const InnerContainer = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px dotted black',
        px: 2,
        pb: 2,
      }}
    >
      <Box marginBottom={2} width="100%">
        <Box>{title}</Box>
        <Divider />
      </Box>

      <Box>{children}</Box>
    </Box>
  );
};
