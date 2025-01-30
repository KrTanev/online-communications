import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Box } from '@mui/material';

import { UsersAutocomplete } from '../../common/UsersAutocomplete';

export type FriendFormData = {
  friendId: string;
};

type FriendFormProps = {
  friendId?: string;
  onChange: (newFriendId: FriendFormData) => void;
};

export const FriendForm = ({ friendId, onChange }: FriendFormProps) => {
  const { getValues, control } = useForm<FriendFormData>({
    defaultValues: { friendId: friendId },
  });

  const handleFormChange = useCallback(() => {
    onChange(getValues());
  }, [onChange, getValues]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <UsersAutocomplete
        id="friendId"
        control={control}
        handleChange={handleFormChange}
        multiple={false}
        title="Find friend"
      />
    </Box>
  );
};
