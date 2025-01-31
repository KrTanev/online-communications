import type { Control, FieldErrors, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';

import { EMPTY_STRING } from '@/utils/constants';

export interface FormFieldProps<T extends FieldValues> {
  id: Path<T>;
  control: Control<T, any>;

  defaultValue?: string;
  errors?: FieldErrors<T>;
  validate?: RegisterOptions<FieldValues, string>;
}

export type ControlledTextFieldProps<T extends FieldValues> = FormFieldProps<T> & TextFieldProps;

export const ControlledTextField = <T extends FieldValues>(props: ControlledTextFieldProps<T>) => {
  const { id, control, defaultValue = EMPTY_STRING, validate, errors, ...textFieldProps } = props;

  return (
    <Controller
      name={id}
      control={control}
      rules={validate as any}
      defaultValue={defaultValue as any}
      render={({ field }) => (
        <TextField
          {...field}
          {...textFieldProps}
          autoComplete="off"
          helperText={errors ? errors[id]?.message?.toString() : textFieldProps.helperText}
          error={Boolean(errors?.[id])}
        />
      )}
    />
  );
};
