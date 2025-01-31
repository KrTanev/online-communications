import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Autocomplete, Chip, TextField } from '@mui/material';

import { useGetAllUsers } from '../../api/controllers/userInfoController';
import { User } from '../../api/types/generic';

type UsersAutocompleteProps<T extends FieldValues> = {
  id: Path<T>;
  control: Control<T>;
  title: string;
  handleChange: () => void;
  multiple?: boolean;
};

export const UsersAutocomplete = <T extends FieldValues>({
  id,
  control,
  title,
  handleChange,
  multiple,
}: UsersAutocompleteProps<T>) => {
  const { data: allUsers } = useGetAllUsers();

  const getUsersByTheirIds = (userIds: number[]) => {
    const foundUsers = userIds?.map((x) => {
      return allUsers?.find((y) => y.id === x);
    });

    return foundUsers as User[];
  };

  return (
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          multiple={multiple === undefined ? true : multiple}
          options={allUsers || []}
          getOptionLabel={(option) => option?.username}
          renderInput={(params) => <TextField {...params} label={title} />}
          renderTags={(value: User[], getTagProps) =>
            value.map((option: User, index: number) => (
              <Chip variant="outlined" label={option?.username} {...getTagProps({ index })} />
            ))
          }
          onChange={(_, newValue) => {
            if (Array.isArray(newValue)) {
              const newIds = newValue.map((x) => x.id);
              onChange(newIds);
              handleChange();
            } else {
              onChange([newValue?.id]);
              handleChange();
            }
          }}
          value={getUsersByTheirIds(value)}
        />
      )}
    />
  );
};
