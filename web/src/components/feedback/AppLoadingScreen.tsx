import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Box, CircularProgress, Skeleton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type Props = { title?: string; description?: string; compact?: boolean };

export function AppLoadingScreen({ title = 'Working with your data', description = 'This can take a moment for larger datasets.', compact = false }: Props) {
  return <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}><Stack spacing={2} alignItems="center" justifyContent="center" sx={{ minHeight: compact ? 150 : 360, textAlign: 'center', px: 3 }}><Box sx={{ position: 'relative', display: 'grid', placeItems: 'center', width: 76, height: 76, borderRadius: '50%', bgcolor: 'rgba(120,147,255,.12)' }}><CircularProgress size={76} thickness={2.2} /><AutoAwesomeRoundedIcon color="primary" sx={{ position: 'absolute' }} /></Box><Typography variant="h6">{title}</Typography><Typography color="text.secondary" variant="body2">{description}</Typography><Stack spacing={.8} sx={{ width: 190, mt: .5 }}><Skeleton variant="rounded" height={7} /><Skeleton variant="rounded" width="70%" height={7} sx={{ alignSelf: 'center' }} /></Stack></Stack></motion.div>;
}
