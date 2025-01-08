import { Box, Divider, Typography } from '@mui/material';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 9999,
      }}
      component="footer"
    >
      <Divider sx={{ width: '100%' }} />
      <Box
        sx={{
          p: 6,
        }}
      >
        <Typography variant="body1">Here for you!</Typography>
        <Typography variant="body2" color="text.main">
          © {year} OE
        </Typography>
      </Box>
    </Box>
  );
}
