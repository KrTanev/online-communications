import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { useAuthorization } from '../../providers/AuthorizationProvider';

export default function Header() {
  const router = useRouter();

  const { authUser } = useAuthorization();

  const handleLogInClick = () => router.push('/login');

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6" component="div">
          Online communications
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {authUser ? (
            <Typography>Hello, {authUser.username}</Typography>
          ) : (
            <Typography onClick={handleLogInClick}>Log in</Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
