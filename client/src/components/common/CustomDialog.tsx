import { ReactNode } from 'react';

import { Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material';

type CustomDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions: ReactNode;
};

export const CustomDialog = (props: CustomDialogProps) => {
  const { open, onClose, title, children, actions } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <Divider />

      <DialogContent sx={{ my: 2 }}>{children}</DialogContent>

      <Divider />
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
