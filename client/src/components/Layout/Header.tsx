import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" sx={{ height: 80 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Typography variant="body1" component="div">
            Nav 1
          </Typography>

          <Typography variant="body1" component="div" sx={{ marginLeft: 2, marginRight: 2 }}>
            Nav 2
          </Typography>

          <Typography variant="body1" component="div">
            Nav 3
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
