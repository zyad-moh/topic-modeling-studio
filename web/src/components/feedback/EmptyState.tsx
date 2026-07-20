import type { ReactNode } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type Props = { icon: ReactNode; title: string; description: string; action?: ReactNode };
export function EmptyState({ icon, title, description, action }: Props) {
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}><Stack spacing={1.6} alignItems="center" sx={{ py: 8, textAlign: 'center', maxWidth: 470, mx: 'auto' }}><Box sx={{ display: 'grid', placeItems: 'center', width: 68, height: 68, borderRadius: 3, color: 'primary.light', bgcolor: 'rgba(120,147,255,.12)' }}>{icon}</Box><Typography variant="h5">{title}</Typography><Typography color="text.secondary">{description}</Typography>{action && <Box sx={{ pt: 1 }}>{action}</Box>}</Stack></motion.div>;
}
