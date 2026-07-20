import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { InputAdornment, TextField } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';
import type { AuthCredentials } from '../../services/authService';

type Props = { register: UseFormRegister<AuthCredentials>; errors: Partial<Record<keyof AuthCredentials, { message?: string }>>; };

export function AuthFormFields({ register, errors }: Props) {
  return <>
    <TextField label="Email address" type="email" autoComplete="email" fullWidth error={Boolean(errors.email)} helperText={errors.email?.message} InputProps={{ startAdornment: <InputAdornment position="start"><EmailRoundedIcon fontSize="small" color="primary" /></InputAdornment> }} {...register('email', { required: 'Enter your email address', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' } })} />
    <TextField label="Password" type="password" autoComplete="current-password" fullWidth error={Boolean(errors.password)} helperText={errors.password?.message} InputProps={{ startAdornment: <InputAdornment position="start"><LockRoundedIcon fontSize="small" color="primary" /></InputAdornment> }} {...register('password', { required: 'Enter your password', minLength: { value: 6, message: 'Use at least 6 characters' } })} />
  </>;
}
