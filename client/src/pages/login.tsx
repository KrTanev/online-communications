import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';

import { Box, Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import { showNotification } from '@/config/notification.config';

import { useVerifyUser } from '../api/controllers/userInfoController';
import AuthLayout from '../components/Layout/AuthLayout';
import { ControlledTextField } from '../components/common/ControlledTextField';
import { TextFieldShowInputAdornment } from '../components/common/TextFieldShowInputAdornment';
import { useAuthorization } from '../providers/AuthorizationProvider';

type UserRegister = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const { setAuthUser } = useAuthorization();

  const authenticateUser = useVerifyUser();

  const { control, formState, watch } = useForm<UserRegister>({ mode: 'onChange' });

  const onSubmit = async (data: UserRegister) => {
    authenticateUser
      .mutateAsync({ email: data.email, password: data.password })
      .then((response) => {
        sessionStorage.setItem('loggedUserObject', JSON.stringify(response));

        setAuthUser(response);
        showNotification('success', 'You successfully signed in!');
        router.push('/main-page');
      })
      .catch((err) => {
        showNotification('error', `Error while signing, ${err}`);
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
          <Typography>Log in</Typography>

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
                  const confirmPassword = (form as UserRegister).confirmPassword;

                  return (
                    value === confirmPassword || !confirmPassword || 'Passwords does not match'
                  );
                },
              },
            }}
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!formState.isValid}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Link variant="body2" sx={{ cursor: 'pointer' }} onClick={() => router.push('/register')}>
            Don't have an account? Sign Up
          </Link>
        </Box>
      </Form>
    </AuthLayout>
  );
};

export default Register;
