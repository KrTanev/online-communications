import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Box, Container, Link, Typography, alpha } from '@mui/material';

type AuthLayoutProps = {
  children: JSX.Element;
};

const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #68B36B, #FFF)'
            : `linear-gradient(#1B5E20, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 10%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        component="main"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          pb: { xs: 8, sm: 12 },
          pt: { xs: 8, sm: 12 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ maxHeight: 4, mb: -4 }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>

          <Box width="400px" paddingTop={12}>
            {children}
          </Box>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
              Online Communications
            </Link>
            {` ${new Date().getFullYear()}.`}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
