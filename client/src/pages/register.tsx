import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { Box, Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { ControlledTextField } from '@/components/common/ControlledTextField';
import { TextFieldShowInputAdornment } from '@/components/common/TextFieldShowInputAdornment';
import { showNotification } from '@/config/notification.config';

import { useCreateNewUser } from '../api/controllers/userInfoController';
import { CreateUserRequest } from '../api/types/user';
import AuthLayout from '../components/Layout/AuthLayout';

type CreateUserForm = CreateUserRequest & {
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();

  const createUser = useCreateNewUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { control, formState, watch } = useForm<CreateUserForm>({ mode: 'onChange' });

  const onSubmit = async (data: CreateUserForm) => {
    createUser
      .mutateAsync(data)
      .then(() => {
        showNotification('success', 'You successfully created an account!');
        router.push('/login');
      })
      .catch((err) => {
        showNotification('error', `There was a problem creating your account: ${err}`);
      });
  };

  return (
    <AuthLayout>
      <Form control={control} onSubmit={({ data }) => onSubmit(data)} noValidate>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Typography>Sign up</Typography>

          <ControlledTextField
            id={'username'}
            control={control}
            label="Username"
            validate={{ required: true }}
            fullWidth
          />

          <ControlledTextField
            id={'email'}
            control={control}
            label="Email"
            validate={{ required: true }}
            fullWidth
          />

          <ControlledTextField
            id={'password'}
            label="Password"
            control={control}
            type={showPassword ? 'text' : 'password'}
            InputProps={
              watch('password')
                ? {
                    endAdornment: (
                      <TextFieldShowInputAdornment
                        showInput={showPassword}
                        setShowInput={setShowPassword}
                      />
                    ),
                  }
                : undefined
            }
            errors={formState.errors}
            validate={{
              required: true,
              validate: {
                passwordMatches: (value: string, form: any) => {
                  const confirmPassword = (form as CreateUserForm).confirmPassword;

                  return (
                    value === confirmPassword || !confirmPassword || 'Passwords does not match'
                  );
                },
              },
            }}
            fullWidth
          />

          <ControlledTextField
            id={'confirmPassword'}
            label="Confirm password"
            control={control}
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={
              watch('confirmPassword')
                ? {
                    endAdornment: (
                      <TextFieldShowInputAdornment
                        showInput={showConfirmPassword}
                        setShowInput={setShowConfirmPassword}
                      />
                    ),
                  }
                : undefined
            }
            validate={{
              required: true,
              validate: {
                passwordMatches: (value: string, form: any) => {
                  const password = (form as CreateUserForm).password;

                  return value === password || !password || 'Passwords does not match';
                },
              },
            }}
            errors={formState.errors}
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!formState.isValid}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>

          <Link variant="body2" sx={{ cursor: 'pointer' }} onClick={() => router.push('/login')}>
            Already have an account? Sign In
          </Link>
        </Box>
      </Form>
    </AuthLayout>
  );
};

export default Register;
