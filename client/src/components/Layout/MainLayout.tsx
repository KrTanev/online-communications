import { Box } from '@mui/material';

import Footer from './Footer';
import Header from './Header';

export default function MainLayout({ children }: { children: JSX.Element }) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Header />

      <Box display="flex">{children}</Box>

      <Footer />
    </Box>
  );
}
