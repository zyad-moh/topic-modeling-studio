import { useState } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import { Alert, Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { runResearcherTopicModeling, type ResearcherConfig } from '../services/nlpService';

const selectOptions = {
  embedding_model: [{ value: 'mpnet', label: 'MPNet' }, { value: 'gte', label: 'GTE' }],
  d_m_model: [{ value: 'umap', label: 'UMAP' }, { value: 'pca', label: 'PCA' }],
  clustering: [{ value: 'hdbscan', label: 'HDBSCAN' }, { value: 'kmeans', label: 'KMeans' }],
};

export function ResearcherWorkflowPage() {
  const { control, register, watch, handleSubmit, formState: { errors } } = useForm<ResearcherConfig>({ defaultValues: { embedding_model: 'mpnet', d_m_model: 'umap', clustering: 'hdbscan', d_m_params: { n_components: 10, metric: 'cosine' }, clustering_params: { n_clusters: 10, metric: 'cosine', cluster_selection_method: 'eom' } } });
  const dModel = watch('d_m_model');
  const clustering = watch('clustering');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const hasDataset = Boolean(localStorage.getItem('dataset_file_name'));
  const onSubmit = async (values: ResearcherConfig) => {
    const body: ResearcherConfig = {
      embedding_model: values.embedding_model,
      d_m_model: values.d_m_model,
      clustering: values.clustering,
      d_m_params: values.d_m_model === 'umap' ? { n_components: values.d_m_params.n_components, metric: values.d_m_params.metric } : { n_components: values.d_m_params.n_components },
      clustering_params: values.clustering === 'hdbscan' ? { n_clusters: values.clustering_params.n_clusters, metric: values.clustering_params.metric, cluster_selection_method: values.clustering_params.cluster_selection_method } : { n_clusters: values.clustering_params.n_clusters },
    };
    try { setProcessing(true); setError(''); const result = await runResearcherTopicModeling(body); navigate('/results', { state: { result } }); }
    catch (err: unknown) { setError(err instanceof Error ? err.message : 'Topic modeling could not be completed.'); setProcessing(false); }
  };
  const selectField = (name: 'embedding_model' | 'd_m_model' | 'clustering', label: string) => <Controller name={name} control={control} render={({ field }) => <FormControl fullWidth><InputLabel id={`${name}-label`}>{label}</InputLabel><Select {...field} labelId={`${name}-label`} label={label}>{selectOptions[name].map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}</Select></FormControl>} />;
  return <Container maxWidth="md" sx={{ py: 3 }}>
    <Navbar />
    <Stack spacing={4} sx={{ mt: { xs: 6, md: 8 } }}>
      <Box><Button onClick={() => navigate('/')} startIcon={<ArrowBackRoundedIcon />} color="inherit">All workflows</Button><Typography variant="h3" sx={{ mt: 2, fontSize: { xs: '2.3rem', md: '3.15rem' } }}>NLP Researcher</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Configure each stage of your topic modeling pipeline.</Typography></Box>
      <Paper component="form" onSubmit={handleSubmit(onSubmit)} elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid rgba(255,255,255,.11)', background: 'linear-gradient(145deg, rgba(27,32,60,.82), rgba(13,16,34,.78))' }}>
        <Stack spacing={3}><Stack direction="row" spacing={1.5} alignItems="center"><Box sx={{ p: 1.1, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: 'rgba(219,127,232,.14)', color: '#e5a4ee' }}><ScienceRoundedIcon /></Box><Typography variant="h5">Research configuration</Typography></Stack>
          {selectField('embedding_model', 'Embedding Model')}
          {selectField('d_m_model', 'Dimensionality Reduction')}
          <Stack spacing={2} sx={{ pl: { sm: 2 }, borderLeft: { sm: '2px solid rgba(109,140,255,.28)' } }}><Typography variant="subtitle2" color="primary.light">{dModel === 'umap' ? 'UMAP parameters' : 'PCA parameters'}</Typography><TextField label="Number of components" type="number" error={Boolean(errors.d_m_params?.n_components)} helperText={errors.d_m_params?.n_components?.message} inputProps={{ min: 1 }} {...register('d_m_params.n_components', { valueAsNumber: true, required: 'Required', min: { value: 1, message: 'Must be at least 1' } })} />{dModel === 'umap' && <Controller name="d_m_params.metric" control={control} render={({ field }) => <FormControl fullWidth><InputLabel id="umap-metric-label">Metric</InputLabel><Select {...field} labelId="umap-metric-label" label="Metric"><MenuItem value="cosine">Cosine</MenuItem><MenuItem value="euclidean">Euclidean</MenuItem></Select></FormControl>} />}</Stack>
          {selectField('clustering', 'Clustering Algorithm')}
          <Stack spacing={2} sx={{ pl: { sm: 2 }, borderLeft: { sm: '2px solid rgba(174,134,255,.28)' } }}><Typography variant="subtitle2" color="secondary.light">{clustering === 'hdbscan' ? 'HDBSCAN parameters' : 'KMeans parameters'}</Typography><TextField label={clustering === 'hdbscan' ? 'Minimum cluster size' : 'Number of clusters'} type="number" error={Boolean(errors.clustering_params?.n_clusters)} helperText={errors.clustering_params?.n_clusters?.message} inputProps={{ min: 1 }} {...register('clustering_params.n_clusters', { valueAsNumber: true, required: 'Required', min: { value: 1, message: 'Must be at least 1' } })} />{clustering === 'hdbscan' && <><Controller name="clustering_params.metric" control={control} render={({ field }) => <FormControl fullWidth><InputLabel id="cluster-metric-label">Metric</InputLabel><Select {...field} labelId="cluster-metric-label" label="Metric"><MenuItem value="cosine">Cosine</MenuItem><MenuItem value="euclidean">Euclidean</MenuItem></Select></FormControl>} /><Controller name="clustering_params.cluster_selection_method" control={control} render={({ field }) => <FormControl fullWidth><InputLabel id="selection-method-label">Cluster selection method</InputLabel><Select {...field} labelId="selection-method-label" label="Cluster selection method"><MenuItem value="eom">EOM</MenuItem><MenuItem value="leaf">Leaf</MenuItem></Select></FormControl>} /></>}</Stack>
          {error && <Alert severity="error">{error}</Alert>}
          {processing ? <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ py: 1 }}><CircularProgress size={27} /><Typography>Running topic modeling…</Typography></Stack></motion.div> : hasDataset ? <Button type="submit" variant="contained" size="large" startIcon={<PlayArrowRoundedIcon />} sx={{ alignSelf: 'flex-start', minWidth: 175, background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Run</Button> : <Button onClick={() => navigate('/upload?mode=researcher')} variant="contained" size="large" startIcon={<CloudUploadRoundedIcon />} sx={{ alignSelf: 'flex-start', background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>Upload a dataset first</Button>}</Stack>
      </Paper>
    </Stack>
  </Container>;
}
