import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import type { ReactNode } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

type WorkflowCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  onContinue: () => void;
  accent: string;
};

export function WorkflowCard({ icon, title, description, onContinue, accent }: WorkflowCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -8, scale: 1.015 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} style={{ height: '100%' }}>
      <Card elevation={0} sx={{ height: '100%', display: 'flex', border: '1px solid rgba(255,255,255,.11)', background: 'linear-gradient(145deg, rgba(31,37,69,.86), rgba(13,16,34,.82))', backdropFilter: 'blur(18px)', transition: 'border-color .2s ease, box-shadow .2s ease', '&:hover': { borderColor: accent, boxShadow: `0 20px 55px ${accent}24` } }}>
        <CardContent sx={{ p: 3.5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', '&:last-child': { pb: 3.5 } }}>
          <Box sx={{ display: 'grid', placeItems: 'center', width: 58, height: 58, borderRadius: 3, color: accent, bgcolor: `${accent}18`, mb: 3 }}>{icon}</Box>
          <Typography variant="h5" fontWeight={750}>{title}</Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.7, flexGrow: 1 }}>{description}</Typography>
          <Button onClick={onContinue} variant="outlined" endIcon={<ArrowForwardRoundedIcon />} sx={{ mt: 4, borderColor: `${accent}80`, color: accent, '&:hover': { borderColor: accent, bgcolor: `${accent}14` } }}>Continue</Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
