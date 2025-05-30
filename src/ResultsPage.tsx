import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const count = location.state?.count ?? 0;

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        We found {count} results. Want to see them?
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/data', { state: { count } })}>
        See Results
      </Button>
    </Box>
  );
};

export default ResultsPage; 