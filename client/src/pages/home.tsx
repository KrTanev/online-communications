import { Box, Button, Typography } from '@mui/material';

import MainLayout from '@/components/Layout/MainLayout';

import { useThemeVariant } from '../providers/ThemeVariantProvider';

export default function Home() {
  const { setIsLightMode } = useThemeVariant();

  return (
    <MainLayout>
      <Box>
        <Button onClick={() => setIsLightMode((prev: boolean) => !prev)}>Click me</Button>
        <Typography>EMPTY PAGE</Typography>
      </Box>
    </MainLayout>
  );
}
