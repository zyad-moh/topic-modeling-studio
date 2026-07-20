import { useState } from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Alert, Box, Button, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthFormFields } from '../../components/auth/AuthFormFields';
import { login, type AuthCredentials } from '../../services/authService';

export function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthCredentials>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (credentials: AuthCredentials) => {
    try { setLoading(true); setError(''); await login(credentials); navigate('/'); }
    catch (err: unknown) { setError(err instanceof Error && 'response' in err ? 'We could not sign you in. Check your email and password.' : 'Unable to reach the server. Please try again.'); }
    finally { setLoading(false); }
  };

  return <AuthCard><Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
    <Stack spacing={3}>
      <Box><Typography variant="h4">Welcome back</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Sign in to continue your research.</Typography></Box>
      {location.state?.created && <Alert severity="success">Your account is ready. Sign in to continue.</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Stack spacing={2}><AuthFormFields register={register} errors={errors} /></Stack>
      <Button type="submit" variant="contained" disabled={loading} endIcon={<ArrowForwardRoundedIcon />} sx={{ background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>{loading ? 'Signing in…' : 'Sign in'}</Button>
      <Typography align="center" variant="body2" color="text.secondary">New to Topic Modeling Studio? <Link component={RouterLink} to="/signup" underline="hover" color="primary.light" fontWeight={700}>Create an account</Link></Typography>
    </Stack>
  </Box></AuthCard>;
}
