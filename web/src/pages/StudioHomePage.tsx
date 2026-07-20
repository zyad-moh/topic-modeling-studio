import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { WorkflowCard } from '../components/dashboard/WorkflowCard';
import { logout } from '../services/authService';

export function StudioHomePage() {
  const navigate = useNavigate();
  const leave = () => { logout(); navigate('/login'); };
  return <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3 } }}>
    <Box component="header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, px: { xs: 1, sm: 2 }, py: 1.25, border: '1px solid rgba(255,255,255,.09)', borderRadius: 3, bgcolor: 'rgba(14,17,36,.48)', backdropFilter: 'blur(14px)' }}>
      <Navbar />
      <Button onClick={leave} color="inherit" startIcon={<LogoutRoundedIcon />}>Sign out</Button>
    </Box>
    <Stack spacing={1.5} alignItems="center" textAlign="center" sx={{ mt: { xs: 7, md: 11 }, mb: { xs: 4, md: 6 } }}>
      <Typography variant="overline" color="primary.light" fontWeight={800} letterSpacing=".14em">Topic intelligence, your way</Typography>
      <Typography variant="h3" sx={{ fontSize: { xs: '2.55rem', md: '3.6rem' } }}>Choose your workflow</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 560, fontSize: { sm: '1.05rem' }, lineHeight: 1.7 }}>Select the level of control that fits your topic modeling project.</Typography>
    </Stack>
    <Grid container spacing={3} alignItems="stretch">
      <Grid size={{ xs: 12, md: 4 }}><WorkflowCard icon={<BusinessCenterRoundedIcon fontSize="large" />} title="Business User" description="Run topic modeling with default settings." accent="#82a0ff" onContinue={() => navigate('/workflow/business')} /></Grid>
      <Grid size={{ xs: 12, md: 4 }}><WorkflowCard icon={<PsychologyRoundedIcon fontSize="large" />} title="Data Scientist" description="Choose embedding model, clustering algorithm and dimensionality reduction." accent="#ae86ff" onContinue={() => navigate('/workflow/data-scientist')} /></Grid>
      <Grid size={{ xs: 12, md: 4 }}><WorkflowCard icon={<ScienceRoundedIcon fontSize="large" />} title="NLP Researcher" description="Full control over every parameter." accent="#db7fe8" onContinue={() => navigate('/workflow/researcher')} /></Grid>
    </Grid>
  </Container>;
}
