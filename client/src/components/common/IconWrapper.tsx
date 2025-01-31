import { MouseEventHandler, ReactNode } from 'react';

import { IconButton, Tooltip } from '@mui/material';

type IconWrapperProps = {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  tooltipTitle?: string;
};

export const IconWrapper = ({ children, onClick, tooltipTitle }: IconWrapperProps) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  );
};
