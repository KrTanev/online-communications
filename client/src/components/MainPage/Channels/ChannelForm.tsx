import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { Box, TextField } from '@mui/material';

import { UsersAutocomplete } from '../../common/UsersAutocomplete';

export type ChannelFormData = {
  channelName: string;
  channelMembers: number[];
};

type ChannelFormProps = {
  channelName?: string;
  channelMembers?: number[];
  onChange: (data: ChannelFormData) => void;
};

export const ChannelForm = ({ channelName, channelMembers, onChange }: ChannelFormProps) => {
  const { register, control, getValues } = useForm<ChannelFormData>({
    defaultValues: { channelName: channelName, channelMembers: channelMembers },
  });

  const handleFormChange = useCallback(() => {
    onChange(getValues());
  }, [onChange, getValues]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Channel name"
        {...register('channelName', { onChange: handleFormChange })}
      />

      <UsersAutocomplete
        id="channelMembers"
        control={control}
        handleChange={handleFormChange}
        title="Channel members"
      />
    </Box>
  );
};
