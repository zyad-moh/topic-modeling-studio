import { useState } from 'react';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { Box, Button, Container, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import type { Data, Layout } from 'plotly.js';
import Plot from 'react-plotly.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { EmptyState } from '../components/feedback/EmptyState';
import type { UserModelingResult } from '../services/nlpService';

type Figure = { data?: unknown[]; layout?: Record<string, unknown>; frames?: unknown[] };

function ResponsiveChart({ figure, label }: { figure: Figure; label: string }) {
  const layout: Partial<Layout> = {
    ...(figure.layout ?? {}),
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#dce2ff' },
    margin: { l: 45, r: 25, t: 55, b: 45 },
  };
  return <Box sx={{ width: '100%', height: { xs: 390, md: 800 }, '& .js-plotly-plot, & .plot-container': { width: '100% !important', height: '100% !important' } }}><Plot data={(figure.data ?? []) as Data[]} layout={layout} frames={figure.frames as never[] | undefined} useResizeHandler style={{ width: '100%', height: '100%' }} config={{ responsive: true, displaylogo: false }} aria-label={label} /></Box>;
}

export function ResultsPage() {
  const [tab, setTab] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const result = (location.state as { result?: UserModelingResult } | null)?.result;
  const documentsPlot = result?.plot as Figure | undefined;
  const chartPlot = result?.char_plot as Figure | undefined;
  const chartAvailable = Boolean(documentsPlot?.data?.length || chartPlot?.data?.length);
  return <Container maxWidth="xl" sx={{ py: 3 }}>
    <Navbar />
    <Stack spacing={3} sx={{ mt: { xs: 5, md: 7 } }}>
      <Box><Button onClick={() => navigate('/')} startIcon={<ArrowBackRoundedIcon />} color="inherit">Dashboard</Button><Typography variant="h3" sx={{ mt: 2, fontSize: { xs: '2.3rem', md: '3.15rem' } }}>Results</Typography><Typography color="text.secondary" sx={{ mt: 1 }}>Explore your topic modeling output.</Typography></Box>
      <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,.11)', background: 'linear-gradient(145deg, rgba(27,32,60,.82), rgba(13,16,34,.78))' }}>
        <Tabs value={tab} onChange={(_, value: number) => setTab(value)} variant="scrollable" scrollButtons="auto" sx={{ px: { xs: 1, sm: 2 }, borderBottom: '1px solid rgba(255,255,255,.1)' }}><Tab icon={<AutoGraphRoundedIcon />} iconPosition="start" label="Overview" /><Tab icon={<DescriptionRoundedIcon />} iconPosition="start" label="Documents" /><Tab icon={<BarChartRoundedIcon />} iconPosition="start" label="Topic Bar Chart" /></Tabs>
        <Box sx={{ p: { xs: 2, sm: 3 } }}>{!chartAvailable ? <EmptyState icon={<AutoGraphRoundedIcon fontSize="large" />} title="No result data available" description="Run a topic modeling workflow to view its visualizations here." action={<Button onClick={() => navigate('/')} variant="contained">Choose a workflow</Button>} /> : <>{tab === 0 && <Stack spacing={1.5} sx={{ py: { xs: 3, md: 7 }, maxWidth: 650, mx: 'auto', textAlign: 'center' }}><AutoGraphRoundedIcon color="primary" sx={{ fontSize: 54, mx: 'auto' }} /><Typography variant="h4">Your topic model is ready</Typography><Typography color="text.secondary">Use the Documents tab to explore document clusters and Topic Bar Chart to compare the most prominent topic terms.</Typography></Stack>}{tab === 1 && documentsPlot && <ResponsiveChart figure={documentsPlot} label="Document topic visualization" />}{tab === 2 && chartPlot && <ResponsiveChart figure={chartPlot} label="Topic bar chart visualization" />}</>}</Box>
      </Paper>
    </Stack>
  </Container>;
}
