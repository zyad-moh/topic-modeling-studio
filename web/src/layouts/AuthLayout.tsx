import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import HubRoundedIcon from '@mui/icons-material/HubRounded';
import { Box, Chip, Container, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'grid', alignItems: 'center', py: { xs: 3, md: 6 } }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.08fr 0.92fr' }, gap: { xs: 5, md: 10 }, alignItems: 'center' }}>
        <Stack spacing={3.5} sx={{ maxWidth: 580, display: { xs: 'none', md: 'flex' } }}>
          <Chip icon={<AutoAwesomeRoundedIcon />} label="AI-powered research workspace" sx={{ alignSelf: 'flex-start', bgcolor: 'rgba(108, 138, 255, .13)', border: '1px solid rgba(126, 151, 255, .24)' }} />
          <Typography variant="h3" sx={{ fontSize: { md: '3.5rem', lg: '4.3rem' }, lineHeight: 1.02 }}>
            Turn noisy text into <Box component="span" sx={{ background: 'linear-gradient(100deg, #8fa9ff, #c28bff)', backgroundClip: 'text', color: 'transparent' }}>clear signals.</Box>
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: '1.08rem', lineHeight: 1.75, maxWidth: 490 }}>
            Explore themes, discover relationships, and make confident decisions with an elegant topic modeling workspace.
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="center" color="text.secondary">
            <HubRoundedIcon color="primary" />
            <Typography variant="body2">Built for focused analysis at every scale.</Typography>
          </Stack>
        </Stack>
        <Outlet />
      </Box>
    </Container>
  );
}
