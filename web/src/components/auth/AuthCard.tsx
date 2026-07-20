import type { ReactNode } from 'react';
import { Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Navbar } from '../layout/Navbar';

type AuthCardProps = { children: ReactNode };

export function AuthCard({ children }: AuthCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 460, mx: 'auto', overflow: 'hidden', border: '1px solid rgba(255,255,255,.12)', background: 'linear-gradient(145deg, rgba(28,33,61,.87), rgba(15,18,36,.78))', backdropFilter: 'blur(20px)', boxShadow: '0 24px 70px rgba(0,0,0,.35)' }}>
        <Box sx={{ p: { xs: 3, sm: 4.5 } }}>
          <Box sx={{ mb: 5, display: { md: 'none' } }}><Navbar /></Box>
          {children}
        </Box>
      </Paper>
    </motion.div>
  );
}
