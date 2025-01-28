import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Autocomplete, Box, Chip, TextField } from '@mui/material';

import { useGetAllUsers } from '../../../api/controllers/userInfoController';
import { User } from '../../../api/types/generic';

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

  const { data: allUsers } = useGetAllUsers();

  const getUsersByTheirIds = (userIds: number[]) => {
    const foundUsers = userIds?.map((x) => {
      return allUsers?.find((y) => y.id === x);
    });

    return foundUsers as User[];
  };

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

      <Controller
        name="channelMembers"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            multiple
            options={allUsers || []}
            getOptionLabel={(option) => option?.username}
            renderInput={(params) => <TextField {...params} label="Channel Members" />}
            renderTags={(value: User[], getTagProps) =>
              value.map((option: User, index: number) => (
                <Chip variant="outlined" label={option?.username} {...getTagProps({ index })} />
              ))
            }
            onChange={(_, newValue) => {
              const newIds = newValue.map((x) => x.id);
              onChange(newIds);
              handleFormChange();
            }}
            value={getUsersByTheirIds(value)}
          />
        )}
      />
    </Box>
  );
};
