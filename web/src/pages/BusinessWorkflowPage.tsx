import { useState } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import DatasetRoundedIcon from '@mui/icons-material/DatasetRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { Alert, Box, Button, CircularProgress, Container, Divider, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { runBusinessTopicModeling } from '../services/nlpService';

export function BusinessWorkflowPage() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fileName = localStorage.getItem('dataset_file_name') ?? 'No dataset uploaded yet';
  const handleRun = async () => {
    try {
      setProcessing(true); setError('');
      const result = await runBusinessTopicModeling();
      navigate('/results', { state: { result } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Topic modeling could not be completed.');
      setProcessing(false);
    }
  };
  return <Container maxWidth="md" sx={{ py: 3 }}>
    <Navbar />
    <Stack spacing={4} sx={{ mt: { xs: 6, md: 8 } }}>
      <Box><Button onClick={() => navigate('/')} startIcon={<ArrowBackRoundedIcon />} color="inherit">All workflows</Button><Typography variant="h3" sx={{ mt: 2, fontSize: { xs: '2.3rem', md: '3.15rem' } }}>Business User</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Run topic modeling with a trusted default configuration.</Typography></Box>
      <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid rgba(255,255,255,.11)', background: 'linear-gradient(145deg, rgba(27,32,60,.82), rgba(13,16,34,.78))' }}>
        <Stack spacing={3}><Stack direction="row" spacing={1.5} alignItems="center"><Box sx={{ p: 1.1, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: 'rgba(109,140,255,.14)', color: 'primary.light' }}><DatasetRoundedIcon /></Box><Typography variant="h5">Dataset summary</Typography></Stack><Divider /><Stack spacing={1}><Typography variant="caption" color="text.secondary" fontWeight={700} letterSpacing=".08em">SELECTED DATASET</Typography><Typography fontWeight={650}>{fileName}</Typography></Stack><Stack direction="row" spacing={1.5} alignItems="center"><SettingsSuggestRoundedIcon color="secondary" fontSize="small" /><Typography variant="body2" color="text.secondary">Default embedding, dimensionality reduction, and clustering settings will be used.</Typography></Stack></Stack>
      </Paper>
      {error && <Alert severity="error">{error}</Alert>}
      <Box>{processing ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Paper elevation={0} sx={{ p: 4, display: 'flex', justifyContent: 'center', border: '1px solid rgba(145,125,255,.28)', bgcolor: 'rgba(135,111,255,.08)' }}><Stack spacing={2} alignItems="center"><CircularProgress /><Typography variant="h6">Modeling your topics…</Typography><Typography variant="body2" color="text.secondary">This may take a moment for larger datasets.</Typography></Stack></Paper></motion.div> : fileName === 'No dataset uploaded yet' ? <Button onClick={() => navigate('/upload?mode=business')} variant="contained" size="large" startIcon={<CloudUploadRoundedIcon />} sx={{ background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Upload a dataset first</Button> : <Button onClick={handleRun} variant="contained" size="large" startIcon={<PlayArrowRoundedIcon />} sx={{ minWidth: 225, background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Run Topic Modeling</Button>}</Box>
    </Stack>
  </Container>;
}
