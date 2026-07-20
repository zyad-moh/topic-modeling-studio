import { useState } from 'react';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Alert, Box, Button, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthFormFields } from '../../components/auth/AuthFormFields';
import { signup, type AuthCredentials } from '../../services/authService';

export function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthCredentials>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (credentials: AuthCredentials) => {
    try { setLoading(true); setError(''); await signup(credentials); navigate('/login', { state: { created: true } }); }
    catch (err: unknown) { setError(err instanceof Error && 'response' in err ? 'That email is already in use or the request was rejected.' : 'Unable to reach the server. Please try again.'); }
    finally { setLoading(false); }
  };
  return <AuthCard><Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
    <Stack spacing={3}>
      <Box><Typography variant="h4">Create your workspace</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Start discovering patterns in your data.</Typography></Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack spacing={2}><AuthFormFields register={register} errors={errors} /></Stack>
      <Button type="submit" variant="contained" disabled={loading} endIcon={<ArrowForwardRoundedIcon />} sx={{ background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>{loading ? 'Creating account…' : 'Create account'}</Button>
      <Typography align="center" variant="body2" color="text.secondary">Already have an account? <Link component={RouterLink} to="/login" underline="hover" color="primary.light" fontWeight={700}>Sign in</Link></Typography>
    </Stack>
  </Box></AuthCard>;
}
