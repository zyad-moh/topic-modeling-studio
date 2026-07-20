import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

const labels: Record<string, string> = { business: 'Business User', 'data-scientist': 'Data Scientist', researcher: 'NLP Researcher' };

export function WorkflowPage() {
  const { mode = '' } = useParams();
  const navigate = useNavigate();
  const label = labels[mode] ?? 'Topic Modeling';
  return <Container maxWidth="lg" sx={{ py: 3 }}>
    <Navbar />
    <Paper elevation={0} sx={{ mt: 8, p: 5, border: '1px solid rgba(255,255,255,.1)', background: 'rgba(18,22,45,.62)' }}>
      <Stack spacing={2}><Button onClick={() => navigate('/')} startIcon={<ArrowBackRoundedIcon />} color="inherit" sx={{ alignSelf: 'flex-start' }}>All workflows</Button><Box><Typography variant="h4">{label} workflow</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Upload a dataset to begin configuring this workflow.</Typography></Box><Button onClick={() => navigate(`/upload?mode=${mode}`)} variant="contained" startIcon={<CloudUploadRoundedIcon />} sx={{ alignSelf: 'flex-start', background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Upload dataset</Button></Stack>
    </Paper>
  </Container>;
}
