import { Box } from '@mui/material';

export const EmptyChat = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        minHeight: '60vh',
      }}
    >
      Select Room or Friend
    </Box>
  );
};
