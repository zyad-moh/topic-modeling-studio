import { useRef, useState } from 'react';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { Alert, Box, Button, Container, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { uploadDataset } from '../services/dataService';

export function UploadDatasetPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const chooseFile = (candidate?: File) => {
    setError('');
    if (!candidate) return;
    if (!candidate.name.toLowerCase().endsWith('.csv')) { setError('Please select a CSV file.'); return; }
    setFile(candidate); setProgress(0); setSuccess(false);
  };
  const handleUpload = async () => {
    if (!file) { setError('Select a CSV file before uploading.'); return; }
    try {
      setUploading(true); setError(''); setProgress(0);
      await uploadDataset(file, setProgress);
      localStorage.setItem('dataset_file_name', file.name);
      setProgress(100); setSuccess(true);
      window.setTimeout(() => navigate('/'), 1000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally { setUploading(false); }
  };

  return <Container maxWidth="md" sx={{ py: 3 }}>
    <Navbar />
    <Paper elevation={0} sx={{ mt: { xs: 6, md: 9 }, p: { xs: 3, sm: 5 }, border: '1px solid rgba(255,255,255,.11)', background: 'linear-gradient(145deg, rgba(27,32,60,.82), rgba(13,16,34,.78))', backdropFilter: 'blur(16px)' }}>
      <Stack spacing={3.5} alignItems="center" textAlign="center">
        <Box><Typography variant="h4">Upload your dataset</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Choose a CSV file to begin your topic modeling workflow.</Typography></Box>
        {success ? <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 16 }}><Stack spacing={1} alignItems="center"><CheckCircleRoundedIcon color="success" sx={{ fontSize: 68 }} /><Typography variant="h5">Dataset uploaded</Typography><Typography color="text.secondary">Taking you to your dashboard…</Typography></Stack></motion.div> : <>
          <Box role="button" tabIndex={0} onClick={() => inputRef.current?.click()} onKeyDown={(event) => event.key === 'Enter' && inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }} sx={{ width: '100%', cursor: 'pointer', p: { xs: 4, sm: 6 }, borderRadius: 3, border: '1.5px dashed', borderColor: dragging ? 'primary.main' : 'rgba(255,255,255,.2)', bgcolor: dragging ? 'rgba(109,140,255,.1)' : 'rgba(255,255,255,.025)', transition: 'all .2s ease', '&:hover': { borderColor: 'primary.light', bgcolor: 'rgba(109,140,255,.07)' } }}>
            <input ref={inputRef} type="file" hidden accept=".csv,text/csv" onChange={(event) => chooseFile(event.target.files?.[0])} />
            <Stack spacing={1.5} alignItems="center"><CloudUploadRoundedIcon color="primary" sx={{ fontSize: 48 }} /><Typography fontWeight={700}>Drag and drop your CSV here</Typography><Typography variant="body2" color="text.secondary">or click to browse files</Typography></Stack>
          </Box>
          {file && <Stack direction="row" spacing={1.25} alignItems="center" sx={{ alignSelf: 'stretch', px: 2, py: 1.5, borderRadius: 2, bgcolor: 'rgba(255,255,255,.055)', textAlign: 'left' }}><InsertDriveFileRoundedIcon color="primary" /><Box sx={{ minWidth: 0 }}><Typography noWrap fontWeight={650}>{file.name}</Typography><Typography variant="caption" color="text.secondary">{(file.size / 1024).toFixed(1)} KB · CSV</Typography></Box></Stack>}
          {uploading && <Box sx={{ width: '100%' }}><LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} /><Typography variant="caption" color="text.secondary">Uploading {progress}%</Typography></Box>}
          {error && <Alert severity="error" sx={{ width: '100%', textAlign: 'left' }}>{error}</Alert>}
          <Button onClick={handleUpload} disabled={uploading} variant="contained" size="large" startIcon={<CloudUploadRoundedIcon />} sx={{ minWidth: 180, background: 'linear-gradient(100deg, #668aff, #9c6bff)' }}>{uploading ? 'Uploading…' : 'Upload CSV'}</Button>
        </>}
      </Stack>
    </Paper>
  </Container>;
}
