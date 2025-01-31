import styled from '@emotion/styled';
import { Paper } from '@mui/material';

export const MessageBox = styled(Paper)<{ isCurrentUser: boolean }>(({ isCurrentUser }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '8px',
  marginBottom: '8px',
  width: '100%',
  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
  backgroundColor: isCurrentUser ? '#e0f7fa' : '#ffffff',
}));
