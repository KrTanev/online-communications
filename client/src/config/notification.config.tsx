import { Slide, ToastContainer, toast } from 'react-toastify';

import { Typography } from '@mui/material';

type NotificationMessageProps = {
  message: string;
  color: string;
};

export const showNotification = (
  type: 'info' | 'success' | 'error' | 'warning',
  message: string,
) => {
  switch (type) {
    case 'info':
      toast.info(<NotificationMessage message={message} color={'info.main'} />);
      break;
    case 'success':
      toast.success(<NotificationMessage message={message} color={'success.main'} />);
      break;
    case 'warning':
      toast.warn(<NotificationMessage message={message} color={'warning.main'} />);
      break;
    case 'error':
      toast.error(<NotificationMessage message={message} color={'error.main'} />);
      break;
    default:
      toast(<NotificationMessage message={message} color={'primary.dark'} />);
  }
};

const NotificationMessage = (props: NotificationMessageProps) => {
  const { message } = props;

  return (
    <Typography sx={{ fontSize: '14px', fontWeight: 600, fontColor: 'text.main' }}>
      {message}
    </Typography>
  );
};

export const NotificationMessages = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3 * 1000}
      pauseOnHover
      newestOnTop
      transition={Slide}
      closeOnClick={false}
    />
  );
};
