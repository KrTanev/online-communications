import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Header() {
  const isLoggedIn = true;

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant="h6" component="div">
          Online communications
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isLoggedIn ? <Typography>Hello User</Typography> : <Typography>Log in</Typography>}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
