import { useState } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Alert, Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { runDataScientistTopicModeling, type DataScientistConfig } from '../services/nlpService';

const fields = [
  { name: 'embedding_model' as const, label: 'Embedding Model', options: [{ value: 'mpnet', label: 'MPNet' }, { value: 'gte', label: 'GTE' }] },
  { name: 'd_m_model' as const, label: 'Dimensionality Reduction', options: [{ value: 'umap', label: 'UMAP' }, { value: 'pca', label: 'PCA' }] },
  { name: 'clustering' as const, label: 'Clustering', options: [{ value: 'hdbscan', label: 'HDBSCAN' }, { value: 'kmeans', label: 'KMeans' }] },
];

export function DataScientistWorkflowPage() {
  const { control, handleSubmit } = useForm<DataScientistConfig>({ defaultValues: { embedding_model: 'mpnet', d_m_model: 'umap', clustering: 'hdbscan' } });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const hasDataset = Boolean(localStorage.getItem('dataset_file_name'));
  const onSubmit = async (config: DataScientistConfig) => {
    try { setProcessing(true); setError(''); const result = await runDataScientistTopicModeling(config); navigate('/results', { state: { result } }); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Topic modeling could not be completed.'); setProcessing(false); }
  };
  return <Container maxWidth="md" sx={{ py: 3 }}>
    <Navbar />
    <Stack spacing={4} sx={{ mt: { xs: 6, md: 8 } }}>
      <Box><Button onClick={() => navigate('/')} startIcon={<ArrowBackRoundedIcon />} color="inherit">All workflows</Button><Typography variant="h3" sx={{ mt: 2, fontSize: { xs: '2.3rem', md: '3.15rem' } }}>Data Scientist</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Select the core models for your topic modeling run.</Typography></Box>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid rgba(255,255,255,.11)', background: 'linear-gradient(145deg, rgba(27,32,60,.82), rgba(13,16,34,.78))' }}>
        <Stack spacing={3}><Stack direction="row" spacing={1.5} alignItems="center"><Box sx={{ p: 1.1, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: 'rgba(174,134,255,.14)', color: 'secondary.light' }}><TuneRoundedIcon /></Box><Typography variant="h5">Model configuration</Typography></Stack>
          {fields.map((field) => <Controller key={field.name} name={field.name} control={control} render={({ field: controllerField }) => <FormControl fullWidth><InputLabel id={`${field.name}-label`}>{field.label}</InputLabel><Select {...controllerField} labelId={`${field.name}-label`} label={field.label}>{field.options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}</Select></FormControl>} />)}
          {error && <Alert severity="error">{error}</Alert>}
          {processing ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 1 }}><CircularProgress size={27} /><Typography>Running topic modeling…</Typography></Stack></motion.div> : hasDataset ? <Button type="submit" variant="contained" size="large" startIcon={<PlayArrowRoundedIcon />} sx={{ alignSelf: 'flex-start', minWidth: 175, background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Run</Button> : <Button onClick={() => navigate('/upload?mode=data-scientist')} variant="contained" size="large" startIcon={<CloudUploadRoundedIcon />} sx={{ alignSelf: 'flex-start', background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Upload a dataset first</Button>}</Stack>
      </Paper>
    </Stack>
  </Container>;
}
