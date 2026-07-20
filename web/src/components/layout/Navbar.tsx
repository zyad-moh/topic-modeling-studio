import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function Navbar() {
  return (
    <Box component={RouterLink} to="/" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2, color: 'text.primary', textDecoration: 'none', transition: 'opacity .2s ease', '&:hover': { opacity: .84 } }}>
      <Box sx={{ display: 'grid', placeItems: 'center', width: 38, height: 38, borderRadius: '12px', background: 'linear-gradient(135deg, #668aff, #ad6eff)', boxShadow: '0 8px 24px rgba(101, 127, 255, .3)' }}>
        <AutoAwesomeRoundedIcon fontSize="small" />
      </Box>
      <Box><Typography fontWeight={800} letterSpacing="-0.04em">Topic Modeling Studio</Typography><Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '.67rem', letterSpacing: '.07em', textTransform: 'uppercase' }}>AI research workspace</Typography></Box>
    </Box>
  );
}
